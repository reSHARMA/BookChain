/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Function which handles book returning to Library
 * @param {org.acme.sample.returnBook} tx The sample transaction instance.
 * @transaction
 */
function returnBook(tx) {

    var bookOwner = tx.book.Owner;
    if(tx.book.lib != "student" && bookOwner != tx.student.studentid){
    	throw new Error('This book does not belong to you !!')
    }
  	tx.book.lib = "library";
  	var date = new Date();
  	tx.book.rturn = date;
    // Get the asset registry for the asset.
    return getAssetRegistry('org.acme.sample.Book')
        .then(function (assetRegistry) {

            // Update the asset in the asset registry.
            return assetRegistry.update(tx.book);

        });
}
/**
 * Function which handles book issuing from Library
 * @param {org.acme.sample.issueBook} tx The sample transaction instance.
 * @transaction
 */
function issueBook(tx) {

    if(tx.book.lib != "library"){
    	throw new Error('This book is not present in Library !!')
    }
  	tx.book.lib = "student";
  	var date = new Date();
  	tx.book.issue = date;
  	tx.book.Owner = tx.student;
    // Get the asset registry for the asset.
    return getAssetRegistry('org.acme.sample.Book')
        .then(function (assetRegistry) {

            // Update the asset in the asset registry.
            return assetRegistry.update(tx.book);

        });
}
/**
 * Function which handles transfers of book
 * @param {org.acme.sample.transferBook} tx The sample transaction instance.
 * @transaction
 */
function transferBook(tx) {

    if(tx.book.lib != "student"){
    	throw new Error('This book belongs to library !!')
    }
  	if(tx.book.Owner.studentid != tx.student1.studentid){
    	throw new Error('This book does not belong to you !!')
    }
  	if(tx.book.Owner.studentid == tx.student2.studentid){
    	throw new Error('You already have this book !!')
    }
  	var date = new Date();
  	tx.book.rturn = date;
  	// claculate fine for student1
  	tx.book.Owner = tx.student2;
    // Get the asset registry for the asset.
    return getAssetRegistry('org.acme.sample.Book')
        .then(function (assetRegistry) {

            // Update the asset in the asset registry.
            return assetRegistry.update(tx.book);

        });
}
/**
 * Function which handles addition of book into library
 * @param {org.acme.sample.addBook} tx The sample transaction instance.
 * @transaction
 */
function addBook(tx) {

    tx.book.lib = "library";
    // Get the asset registry for the asset.
    return getAssetRegistry('org.acme.sample.Book')
        .then(function (assetRegistry) {

            // Update the asset in the asset registry.
            return assetRegistry.update(tx.book);

        });
}
