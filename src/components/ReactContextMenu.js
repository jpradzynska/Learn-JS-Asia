import React, {PropTypes} from 'react';

export default class ContextMenu extends React.Component {

  static propTypes = {
    recipe: PropTypes.object.isRequired,
    contextID: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: React.PropTypes.object.isRequired
  }

  render() {
    const elementUniqueId = 'context-menu-' + this.props.contextID;
    const visibilityClass = (elementUniqueId === this.props.recipe.currentlyOpenContextMenuId) ? 'visible context-menu' : 'invisible context-menu';
    const {actions: {closeContextMenu}} = this.props;
    return (
      <div id={elementUniqueId} className={visibilityClass} onMouseLeave={closeContextMenu}>

        {this.props.items.map((item) => {
          const clickHandler = () => {
            closeContextMenu();
            item.function();
          };

          const label = item.label;
          const icon = item.icon;

          return (
            <span onClick={clickHandler} key={label}>
              <img className="icon" src={icon} role="presentation"/>
              {label}
            </span>
          );
        })}
      </div>
    );
  }
}
