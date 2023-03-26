import React from 'react';
import './SmartTable.css';

// THIS COMPONENT HS NO FUNCTION BUT TO DEFINE TABLE COLUMN BEHAVIOUR (HIDING LOW PRIORITY COLUMNS ON SMALLER SCREENS).
// In child component <th> and <td> elements, set className to "priority-x" to hide the column unless the screen is at least x00 pixels wide.

function SmartTable({children}) {
    return (
        <table>
            {children}
        </table>
    );
}

export default SmartTable;