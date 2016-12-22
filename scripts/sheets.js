(function(window) {
  'use strict';

  var Sheets = React.createClass({
    displayName: 'Sheets',
    getInitialState: function () {
      return {
        data: this.props.initialData,
        sortby: null,
        descending: false,
      };
    },
    propTypes: {
      headers: React.PropTypes.arrayOf(
        React.PropTypes.string
      ),
      initialData: React.PropTypes.arrayOf(
        React.PropTypes.arrayOf(
          React.PropTypes.string
        )
      ),
    },

    _sort: function (e) {
      var column = e.target.cellIndex;
      var data = this.state.data.slice();
      var descending = this.state.sortby === column && !this.state.descending;
      data.sort(function (a, b) {
        return descending
          ? (a[column] < b[column] ? 1 : -1)
          : (a[column] > b[column] ? 1 : -1);
      });
      this.setState({
        data: data,
        sortby: column,
        descending: descending,
      });
    },
    render: function () {
      return (
        React.DOM.table({className: 'pure-table pure-table-bordered'},
          React.DOM.thead({onClick: this._sort},
            React.DOM.tr(null,
              this.props.headers.map(function (title, idx) {
                if (this.state.sortby === idx) {
                  title += this.state.descending ? ' \u2191' : ' \u2193'
                }
                return React.DOM.th({key: idx}, title);
              }, this)
            )
          ),
          React.DOM.tbody(null,
            this.state.data.map(function (row, idx) {
              return (
                React.DOM.tr({key: idx},
                  row.map(function (cell, idx) {
                    return React.DOM.td({key: idx}, cell);
                  })
                )
              );
            })
          )
        )
      );
    }
  });

  ReactDOM.render(
    React.createElement(Sheets, {
      headers: headers,
      initialData: data,
    }),
    document.getElementById('app')
  );

})(window);
