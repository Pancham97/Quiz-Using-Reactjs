/*eslint-env jquery*/

import React from 'react';

class DropDownList extends React.Component {
    componentDidMount() {
        // $(document).ready(function() {
        //     $('select').material_select();
        // })
    }

    render() {
        let items = this.props.items;

        return (
         <div className="row">
            <div className="col m6">
                <select id="subcategory">
                    {items.map((element) =>
                        <option key={element.id} value={element.id}>{element.name}</option>
                    )}
                </select>
                
            </div>
         </div>
        )
    }
}

export default DropDownList;