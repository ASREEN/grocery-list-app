const Item = require('../model/itemSchema');

exports.allItems = (req, res) => {
    let nonePriorityItems = [], priorityItems = [];
    Item.find((err, itemList) => {
        if (err) throw err;
        itemList.map(item => {
            if (item.priority == 'none') nonePriorityItems.push(item);
            else priorityItems.push(item);
        })
        // sort the array based on priority of the item
        priorityItems.sort((a, b) => (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0));
        res.render('index', { itemsNotCompleted: priorityItems, itemsAreCompleted: nonePriorityItems, msg: req.flash('msg') })
    })

}
// show all items from DB
exports.addItem = (req, res) => {
    // check the priorty
    let match = false;
    Item.find((err, allDoc) => {
        if (err) throw err;
        const priorityReq = req.body.priority;
        allDoc.map(doc => {
            if (doc.priority == priorityReq) {
                match = true;
            }
        })
        console.log({ match })
        if (match == true) {
            req.flash('msg', 'You have already an item in this position, please change the number')
            res.redirect('/')
        }
        else {
            const newItem = new Item(req.body);
            newItem.save((err, data) => {
                if (err) {
                    req.flash('msg', `${err.message}`)
                    res.redirect('/')
                };
                // console.log({ data })
                req.flash('msg', 'you added new item to your grocery list')
                res.redirect('/')
            })
        }

    })
}


// update an Item
exports.updateItem = (req, res) => {
    let id = req.params.id;
    console.log(req.body)
    // check the priorty
    let match = false;
    Item.find((err, allDoc) => {
        if (err) throw err;
        const priorityReq = req.body.priority;
        allDoc.map(doc => {
            if (doc.priority == priorityReq) {
                match = true;
            }
        })
        console.log({ match })
        if (match == false) {
            Item.findByIdAndUpdate(id, req.body, (err, data) => {
                if (err) throw err;
                // console.log(data)
                data.save((err, doc) => {
                    if (err) throw err;
                    req.flash('msg', 'One item has been updated')
                    res.redirect('/')
                })

            })
        }
        else {
            req.flash('msg', 'You have already an item in this position, please change the number')
            res.redirect('/')
        }

    })
}
// remove an Item
exports.removeItem = (req, res) => {
    let id = req.params.id;
    Item.deleteOne({ _id: id }, (err, data) => {
        if (err) throw err;
        console.log('One item has been deleted')
        req.flash('msg', 'One item has been deleted')
        res.redirect('/')
    })
}
// make completed =true / item is done
exports.updateCompleted = (req, res) => {
    let id = req.params.id;
    Item.findById(id, (err, doc) => {
        if (err) throw err;
        console.log(doc.completed)
        if (doc.completed == true && doc.priority == 'none') {
            doc.completed = false;
            doc.priority = 'others';
        }
        else {
            doc.completed = true;
            doc.priority = 'none';
        }
        doc.save((err, data) => {
            if (err) throw err;
            console.log(data);

        })
        res.redirect('/')
    })
}
