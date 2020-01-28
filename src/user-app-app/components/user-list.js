import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
//import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';

import './shared/smart-dialog.js';

class UserList extends PolymerElement {

    static get template() {
        return html`

        <paper-button raised on-click="_addUser"><iron-icon icon="add"></iron-icon>Add User</paper-button>

        <table>
        <thead>
            <tr><td>NO</td><td>User Name</td><td>SapId</td><td>Action</td></tr>
        </thead>
        <tbody>
            <template is="dom-repeat" items={{userList}}>
                <tr>
                    <td>{{_getIndex(index)}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.sapId}}</td>
                    <td>
                        <iron-icon icon="delete" on-click="_handleDelete"></iron-icon>
                        <iron-icon icon="create" on-click="_handleEdit"></iron-icon>
                    </td>
                </tr>
            </template>
        </tbody>
        </table>
        <iron-ajax id="ajax"
        handle-as="json"
        on-response="_handleResponse"
        debounce-duration="300"
        content-type="application/json"></iron-ajax>

        <paper-dialog id="addUser" entry-animation="scale-up-animation" exit-animation="fade-out-animation" with-backdrop>
        <h2>User Information</h2>
        <paper-dialog-scrollable>
            <iron-form id="addUserForm">
                <form>
                    <paper-input label="User Name" required error-message="Enter User Name" value="{{name}}"></paper-input>
                    <paper-input label="SapId" required error-message="Enter Sap Id" value={{sapId}}></paper-input>
                    <paper-button raised on-click="_handleAddUser">Add User</paper-button>
                </form>
            </iron-form>
            </paper-dialog-scrollable>
        </paper-dialog>
        <paper-toast id="toast" text="{{message}}"></paper-toast>

            `;
    }
    static get properties() {
        return {
            userList: {
                type: Array,
                value: []
            },
            name: {
                type: String
            },
            sapId: {
                type: String
            },
            action: {
                type: String,
                value: 'list'
            },
            message: {
                type: String
            },
            id: {
                type: Number
            }
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this._getData();
    }
    _getData() {
        this.makeAjax('get', 'http://localhost:3000/users', null)
    }
    _addUser() {
        this.$.addUser.open();
        this.action = 'add-user';
    }
    _getIndex(index) {
        return index + 1;
    }
    _handleAddUser() {
        let url = 'http://localhost:3000/users';
        // if (this.$.addUserForm.validate()) {
        let obj = { name: this.name, sapId: this.sapId };
        let method;
        switch (this.action) {
            case 'add-user':
                method = 'POST';
                break;
            case 'update-user':
                method = 'PUT';
                url = `${url}/${parseInt(this.id)}/`;
                break;
            default: break;
        }
        this.makeAjax(method,url, obj);

    }
    _handleDelete(event) {
        let confrm = confirm("Are you sure you want to delete ?");
        if (confrm) {
            this.action = 'delete';
            this.makeAjax('delete', `http://localhost:3000/users/${event.model.item.id}`, null);
        }
    }
    _handleEdit(event) {
        this.action = 'update-user';
        this.$.addUser.open();
        const { name, sapId , id} = event.model.item;
        this.name = name;
        this.sapId = sapId;
        this.id = id;

        // this.makeAjax('put', `http://localhost:3000/users/${event.model.item.id}`, obj);
    }
    _handleResponse(event) {
        console.log(event)
        switch (this.action) {
            case 'list': this.userList = event.detail.response;
                break;
            case 'delete':
                this.$.toast.open();
                this.message = 'Successfully Deleted!!!';
                this.action = 'list';
                this._getData();
                break;
            case 'update-user':
                this.$.toast.open();
                this.$.addUser.close();
                this.message = 'Successfully Updated!!!';
                this.action = 'list';
                this._getData();
                break;
            case 'add-user':
                this.$.toast.open();
                this.$.addUser.close();
                this.message = 'Successfully Added!!!';
                this.action = 'list';
                this._getData();
                break;
        }
    }

    makeAjax(method, url, postObj) {
        let ajax = this.$.ajax;
        ajax.method = method;
        ajax.url = url;
        ajax.body = postObj ? postObj : undefined;
        ajax.generateRequest();
    }

}
customElements.define('user-list', UserList);