const ListComponent = function() {


  class ListHeadComponent extends React.Component {

    onClickSort(e) {
      e.preventDefault();
      console.log(e);
      return;
    }

    render() {
      let Headers = [], key, attr;

      for(let entry of this.props.attributes) {
        key = entry[0];
        attr = entry[1];
        Headers.push(
            <div key={key} data-prop={key} className="c-list__head-box">
              <a href="#sort={key}" data-prop={key} onClick={this.onClickSort}>{attr.name}</a>
            </div>
        );
      }

      return (
          <div className="c-list__head">
            {Headers}
          </div>
      );
    }
  };


  const ListItemComponent = (props) => {
    let keys = props.model.keys();
    let Values = props.model.values().map((value,i) =>
        <div key={keys[i]} data-prop={keys[i]} className="c-list__item-box">{value}</div>
    );

    return (
        <section data-id={props.model.id} className="c-list__item">
          {Values}
        </section>
    );
  };

  ListItemComponent.propTypes = {
    model: React.PropTypes.instanceOf(Backbone.Model).isRequired
  };

  class ListComponent extends React.Component {
    render() {
      let className = "c-list";
      if(this.props.styleHovered) className += " s-hovered";
      if(this.props.styleStriped) className += " s-striped";

      let Items = this.props.collection.slice(0, 80).map(model =>
          <ListItemComponent key={model.id} model={model} />
      );

      return (
          <section className={className}>
            <ListHeadComponent attributes={mapAttributes} />
            <div className="c-list__body">
              {Items}
            </div>
            <div className="c-list__foot"></div>
          </section>
      );
    }
  };

  ListComponent.propTypes = {
    collection: React.PropTypes.instanceOf(Backbone.Collection).isRequired
  };


  return ListComponent;
}();