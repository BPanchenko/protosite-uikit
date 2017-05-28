const ListComponent = function() {


  /* HeadColumnComponent */

  class HeadColumnComponent extends React.Component {

    constructor(props) {
      super(props);
      let collectionState = this.props.collection.state.toJSON();
      this.state = {
        sort: collectionState.sortKey == this.props.fieldKey ? collectionState.sortOrder : 'none'
      };
      this.onClickSort = this.onClickSort.bind(this);
    }

    onClickSort(e) {
      e.preventDefault();
      this.props.collection.state.set('sortKey', this.props.fieldKey);
      return;
    }

    render() {
      let state = this.props.collection.state.toJSON();
      let field = state.fields[this.props.fieldKey];

      let iconGlyph = this.state.sort == 'asc' ? 'caret-bottom' : this.state.sort == 'desc' ? 'caret-bottom' : 'elevator';
      let iconClassName = 'iconic';

      if (this.state.sort == 'none') iconClassName += ' s-muted';

      return (
          <div className="c-list__head-box">
            <a href="#sort={key}" aria-sort={this.state.sort} role="columnheader" className="c-button s-link" onClick={this.onClickSort}>
              <span className="c-button__text">{field.name || field.comment || this.props.fieldKey}</span>
              <span className="c-button__icon">
                <i className={iconClassName} data-glyph={iconGlyph}></i>
              </span>
            </a>
          </div>
      );
    }
  };


  /* HeadComponent */

  const HeadComponent = (props) => {
    var children = [];
    var fields = props.collection.state.get('fields');

    for(let key in fields) {
      children.push(
          <HeadColumnComponent key={key} fieldKey={key} collection={props.collection} />
      );
    }

    return (
        <div className="c-list__head">
          {children}
        </div>
    );
  };


  /* ItemComponent */

  const ListItemComponent = (props) => {
    let keys = props.model.keys();
    let children = props.model.values().map((value,i) =>
        <div key={keys[i]} data-prop={keys[i]} className="c-list__item-box">{value}</div>
    );

    return (
        <section data-id={props.model.id} className="c-list__item">
          {children}
        </section>
    );
  };

  ListItemComponent.propTypes = {
    model: React.PropTypes.instanceOf(Backbone.Model).isRequired
  };


  /* ListComponent */

  class ListComponent extends React.Component {
    render() {
      let className = "c-list";
      if(this.props.isHovered) className += " s-hovered";
      if(this.props.isStriped) className += " s-striped";
      
      let children = this.props.collection.map(model =>
          <ListItemComponent key={model.id} model={model} />
      );

      return (
          <section className={className}>
            <HeadComponent collection={this.props.collection} />
            <div className="c-list__body">
              {children}
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