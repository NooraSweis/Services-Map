import React, { Component } from "react";
import "../style/AccountApproval.css";
import { CustomDialog } from "react-st-modal";
import ItemDialog from "./AcceptAccountDialog";

class ApprovalItem extends Component {
    render() {
        return (
            <div className="approval-item">
                <div className="aprroval-item-name" onClick={async () => {
                    const result = await CustomDialog(<ItemDialog />, {
                        title: 'Account Request Information',
                        showCloseIcon: true,
                    });
                }}>Name</div>
                <button className="aprroval-item-btn">Accept</button>
            </div>
        );
    }
}
export default ApprovalItem;