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
import '@polymer/neon-animation/animations/scale-down-animation.js';
import '@polymer/neon-animation/animations/scale-up-animation.js';
import '@polymer/neon-animation/animations/fade-out-animation';
import 'ag-grid-polymer';

class UserList extends PolymerElement {

    static get template() {
        return html`
        <link rel="stylesheet" href="../../../node_modules/ag-grid-community/dist/styles/ag-grid.css" />
        <link rel="stylesheet" href="../../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css" />
        <style>
        paper-toast {
            width: 300px;
            margin-left: calc(50vw - 150px);
        }
        </style>
        

        <!-- <paper-button raised on-click="_addUser" id="add"><iron-icon icon="add"></iron-icon>Add User</paper-button>
        <h1>List of Users</h1>
       
        <ag-grid-polymer style="width: 100%; height: 350px;"
                         class="ag-theme-balham"
                         rowData="{{userList}}"
                         columnDefs="{{columnDefs}}"
                         on-first-data-rendered="{{firstDataRendered}}"
        ></ag-grid-polymer>-->






        <table class="table table-condensed">
            <thead>
                <tr><td>NO</td><td>User Name</td><td>SapId</td><td>Action</td></tr>
            </thead>
            <tbody>
                <template is="dom-repeat" items={{userList}}>
                    <tr class="user-info">
                        <td>{{_getIndex(index)}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.sapId}}</td>

                        <td>
                            <button on-click="_handleIncre" data-set$={{index}}>+</button>
                            <span>{{item.quantity}}</span>
                            <button on-click="_handleDec" data-set$={{index}}>-</button>
                        </td>

                        
                    </tr>
                </template>
            </tbody>
        </table>
        <paper-button on-click="_handleData">Submit</paper-button>










        <iron-ajax id="ajax"
        handle-as="json"
        on-response="_handleResponse"
        debounce-duration="300"
        content-type="application/json"></iron-ajax>

        <paper-dialog id="addUser" entry-animation="scale-up-animation" exit-animation="fade-out-animation" >
        <h2>User Information</h2>
        <paper-dialog-scrollable>
            <iron-form id="addUserForm">
                <form>
                    <paper-input label="User Name" required error-message="Enter User Name" value="{{name}}" id="userName"></paper-input>
                    <paper-input label="SapId" required error-message="Enter Sap Id" value={{sapId}} id="sapId"></paper-input>
                    <paper-button raised on-click="_handleAddUser" id="submitAddUser">Add User</paper-button>
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
        this.columnDefs = [
            { headerName: "Index", field: "index", sortable: true, filter: true },
            { headerName: "Name", field: "name", sortable: true, filter: true },
            { headerName: "sap Id", field: "sapId", sortable: true, filter: true },
        ];


    }
    firstDataRendered(params) {
        params.api.sizeColumnsToFit()
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


    /**
     * @description: When click on plus button, increment the quantity
     * @param {Event} event 
     */
    _handleIncre(event) {
        let { id } = event.model.item;
        let index = event.target.dataset.set; // pass the index from template as data-set$
        let data = this.userList.filter((item) => item.id === id); // find the object from array using index(line 139)
        this.set(`userList.${index}.quantity`, data[0]['quantity'] ? data[0]['quantity'] + 1 : 1); // update the quantity
    }
    /**
     * @description: When click on minus button, decrement the quantity
     * @param {Event} event 
     */
    _handleDec(event) {
        let { id } = event.model.item;
        let index = event.target.dataset.set;// pass the index from template as data-set$
        let data = this.userList.filter((item) => item.id === id);// find the object from array using index(line 149)
        this.set(`userList.${index}.quantity`, data[0]['quantity'] > 1 ? data[0]['quantity'] - 1 : 0);// update the quantity
    }
    /**
     * print or check the updated values in the array
     */
    _handleData() {
        console.log(this.userList)
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
        this.makeAjax(method, url, obj);

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
        const { name, sapId, id } = event.model.item;
        this.name = name;
        this.sapId = sapId;
        this.id = id;

        // this.makeAjax('put', `http://localhost:3000/users/${event.model.item.id}`, obj);
    }
    _handleResponse(event) {
        console.log(this.action, event.detail.response)
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