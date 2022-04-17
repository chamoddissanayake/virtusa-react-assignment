import axios from 'axios';


export default class UserServices{

    fetchAllUsersList(callback){
        axios.get(`http://localhost:3000/users`)
            .then(function (response) {
                callback(response.data) ;
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 404) {
                        // callback(`\u2014`)
                        return error.response;
                    }
                }
            })
    }

    addNewUser(callback, userData){

        axios.post(`http://localhost:3000/users`, userData)
            .then(function (response) {
                // alert("successfully added")
                callback(response.data) ;
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 404) {
                        alert("Something went wrong")
                        return error.response;
                    }
                }
            })
    }

    deleteUser(callback, id){

        axios.delete(`http://localhost:3000/users/`+ id)
            .then(function (response) {
                // alert("user deleted successfully")
                callback(response.data) ;
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 404) {
                        console.log("^^^")
                        console.log(error)
                        alert("Something went wrong")

                        return error.response;
                    }
                }
            })
    }

    updateUser(callback, userData){

        axios.put(`http://localhost:3000/users/`+userData.id, userData)
            .then(function (response) {
                // alert("successfully updated")
                callback(response.data) ;
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 404) {
                        alert("Something went wrong")
                        return error.response;
                    }
                }
            })
    }

}
