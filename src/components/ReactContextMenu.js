import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions/recipeActions';

class ContextMenu extends React.Component {

    static propTypes = {
        recipe: PropTypes.object.isRequired,
        contextID: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.object).isRequired
    }

    render() {
        const elementUniqueId = 'context-menu-' + this.props.contextID;
        const visibilityClass = (elementUniqueId === this.props.recipe.currentlyOpenContextMenuId) ? 'visible context-menu' : 'invisible context-menu';
        return (
            <div id={elementUniqueId} className={visibilityClass} onMouseLeave={this.props.closeContextMenu}>

                {this.props.items.map((item) => {
                    const clickHandler = () => {
                        this.props.closeContextMenu();
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

function mapStateToProps(state) {
    return {
        recipe: state.recipe
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        closeContextMenu: actions.closeContextMenu
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ContextMenu);