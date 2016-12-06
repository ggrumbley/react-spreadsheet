(function(window) {
  'use strict';

  var Sheets = React.createClass({
    displayName: 'Sheets',
    getInitialState: function () {
      return {data: this.props.initialData};
    },
    render: function () {
      return (
        React.DOM.table({className: 'pure-table pure-table-bordered'},
          React.DOM.thead(null,
            React.DOM.tr(null,
              this.props.headers.map(function (title, idx) {
                return React.DOM.th({key: idx}, title);
              })
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
