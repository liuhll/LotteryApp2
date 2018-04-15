import {
    getSignedInfo,
    signed,
    signedlist

  } from '@/api/operation'

const operationData = {
    actions: {
        GetSignedInfo({}) {
            return new Promise((resolve, reject) => {
                getSignedInfo().then(response => {
                     if (response.success) {
                         const data = response.result;
                         resolve(data);
                     } else {
                         reject(response.error)
                     }
                 }).catch(error => {
                     reject(error);
                 })
             }); 
        },
        Signed({}) {
            return new Promise((resolve, reject) => {
                signed().then(response => {
                     if (response.success) {
                         const data = response.result;
                         resolve(data);
                     } else {
                         reject(response.error)
                     }
                 }).catch(error => {
                     reject(error);
                 })
             });
        },
        GetSignedList({}) {
            return new Promise((resolve, reject) => {
                signedlist().then(response => {
                     if (response.success) {
                         const data = response.result;
                         resolve(data);
                     } else {
                         reject(response.error)
                     }
                 }).catch(error => {
                     reject(error);
                 })
             });
        }
    }
}

export default operationData