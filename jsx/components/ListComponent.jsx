const ListComponent = function() {

  const ListHeadComponent = React.createClass({
    render: function() {
      let Headers = [], key, attr;

      for(let entry of this.props.attributes) {
        key = entry[0];
        attr = entry[1];
        Headers.push(
            <div key={key} data-prop={key} className="c-list__head-box">
              <a href="#sort={key}">{attr.name}</a>
            </div>
        );
      }

      return (
          <div className="c-list__head">
            {Headers}
          </div>
      );
    }
  });

  const ListItemComponent = React.createClass({
    render: function() {
      let keys = this.props.model.keys();
      let Values = this.props.model.values().map((value,i) =>
          <div key={keys[i]} data-prop={keys[i]} className="c-list__item-box">{value}</div>
      );

      return (
          <section data-id={this.props.model.id} className="c-list__item">
            {Values}
          </section>
      );
    }
  });

  const ListComponent = React.createClass({
    render: function() {

      let Items = this.props.collection.slice(0, 80).map(model =>
          <ListItemComponent key={model.id} model={model} />
      );

      return (
          <section className="c-list s-hovered s-striped">
            <ListHeadComponent attributes={mapAttributes} />
            <div className="c-list__body">
              {Items}
            </div>
            <div className="c-list__foot"></div>
          </section>
      );
    }
  });

  return ListComponent;
}();