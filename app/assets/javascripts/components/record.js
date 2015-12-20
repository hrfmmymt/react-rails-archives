(function() {
  this.Record = React.createClass({
    getInitialState: function() {
      return {
        edit: false
      };
    },
    handleToggle: function(e) {
      e.preventDefault();
      return this.setState({
        edit: !this.state.edit
      });
    },
    handleDelete: function(e) {
      e.preventDefault();
      return $.ajax({
        method: 'DELETE',
        url: '/records/' + this.props.record.id,
        dataType: 'JSON',
        success: (function(_this) {
          return function() {
            return _this.props.handleDeleteRecord(_this.props.record);
          };
        })(this)
      });
    },
    handleEdit: function(e) {
      var data;
      e.preventDefault();
      data = {
        title: React.findDOMNode(this.refs.title).value,
        date: React.findDOMNode(this.refs.created_at),
        milk_amount: React.findDOMNode(this.refs.milk_amount).value
      };
      return $.ajax({
        method: 'PUT',
        url: '/records/' + this.props.record.id,
        dataType: 'JSON',
        data: {
          record: data
        },
        success: (function(_this) {
          return function(data) {
            _this.setState({
              edit: false
            });
            return _this.props.handleEditRecord(_this.props.record, data);
          };
        })(this)
      });
    },
    recordRow: function() {
      return React.DOM.tr(null,
        React.DOM.td(null, this.props.record.id),
        // React.DOM.td(null, this.props.record.title),
        React.DOM.td(null, amountFormat(this.props.record.milk_amount)),
        React.DOM.td(null, dateFormat(this.props.record.created_at)),
        React.DOM.td(null, dateFormat(this.props.record.updated_at)),
        React.DOM.td(null,
          React.DOM.button({
            className: 'btn btn-default',
            onClick: this.handleToggle
          }, '編集'),
          React.DOM.button({
            className: 'btn btn-danger',
            onClick: this.handleDelete
          }, '削除')
        )
      );
    },
    recordForm: function() {
      return React.DOM.tr(null,
        React.DOM.td(null, this.props.record.id),
        // React.DOM.td(null,
        //   React.DOM.input({
        //     className: 'form-control',
        //     type: 'text',
        //     defaultValue: this.props.record.title,
        //     ref: 'title'
        //   })
        // ),
        React.DOM.td(null,
          React.DOM.input({
            className: 'form-control',
            type: 'number',
            defaultValue: this.props.record.milk_amount,
            ref: 'milk_amount'
          })
        ),
        React.DOM.td(null, dateFormat(this.props.record.created_at)),
        React.DOM.td(null, dateFormat(this.props.record.updated_at)),
        React.DOM.td(null,
          React.DOM.button({
            className: 'btn btn-default',
            onClick: this.handleEdit
          }, '更新'),
          React.DOM.button({
            className: 'btn btn-danger',
            onClick: this.handleToggle
          }, 'キャンセル')
        )
      );
    },
    render: function() {
      if(this.state.edit) {
        return this.recordForm();
      } else {
        return this.recordRow();
      }
    }
  });

}).call(this);