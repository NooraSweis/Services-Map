import React, { Component } from "react";
import ApprovalItem from "./ApprovalItem";
import "../style/AccountApproval.css";

class AccountApproval extends Component {
    render() {
        return (
            <div className="outerdiv">
                <ApprovalItem />
            </div>
        );
    }
}
export default AccountApproval;