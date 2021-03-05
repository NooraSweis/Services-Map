import React, { Component } from "react";

export default class AdminMenu extends Component {
    constructor() {
        super();
        this.state = {
            showMenu: false,
        }

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {
        if (!this.dropdownMenu.contains(event.target)) {
            this.setState({ showMenu: false }, () => {
                document.removeEventListener('click', this.closeMenu);
            });
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.showMenu}>
                    Admin Name
                </button>
                {
                    this.state.showMenu
                        ? (
                            <div
                                className="menu"
                                ref={(element) => {
                                    this.dropdownMenu = element;
                                }}
                            >
                                <button> Account Approval </button>
                                <button> Add Fixed Place </button>
                                <button> New Admin </button>
                                <button> Sign Out </button>
                            </div>
                        )
                        : (
                            null
                        )
                }
            </div>
        );
    }
}


/*
Tutorial:
https://blog.campvanilla.com/reactjs-dropdown-menus-b6e06ae3a8fe
*/
