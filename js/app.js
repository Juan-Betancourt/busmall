'use strict';

//we need an array of images-DONE
//we need a constructor function for products-DONE
//we need an event listener
//we need an image repository 
//we need to randomize the images-DONE
//we need a vote counter
//we need a view counter
//we need an event handler
//we need to know total clicks
//we need to display the list w/ DOM manipulation
//we need to make sure the images do not repeat-DONE
//all the DOM appending
Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
Product.all = [];
Product.container = document.getElementById('image-container');
Product.justViewed = [];
Product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
Product.tally = document.getElementById('total-clicks');
Product.totalClicks = 0;

//========== Create Constructor ============//
function Product(name) {
    this.name = name;
    if (name === 'sweep') {
        this.path = 'img/' + name + '.png';
    } else if (name === 'usb') {
        this.path = 'img/' + name + '.gif';
    } else {
        this.path = 'img/' + name + '.jpg';
    }
    this.votes = 0;
    this.view = 0;
    Product.all.push(this);
}
for (var i = 0; i < Product.names.length; i++) {
    new Product(Product.names[i]);
}

//========== Make Random Generator for Products========//
function makeRandom() {
    return Math.floor(Math.random() * Product.names.length);
}

//========= Create Three Pics that Display Randomly=====//
function showPics() {
    var currentPic = [];
    currentPic[0] = makeRandom(); // make the left side image random
    while (Product.justViewed.indexOf(currentPic[0]) !== -1) {
        console.error('Duplicate, rerun!');
        currentPic[0] = makeRandom();
    };

    currentPic[1] = makeRandom(); // make the center image random
    while (currentPic[0] === currentPic[1] || Product.justViewed.indexOf(currentPic[1]) !== -1) {
        console.error('Duplicate at Center');
        currentPic[1] = makeRandom();
    };


    currentPic[2] = makeRandom(); // make the right image random
    while (currentPic[0] === currentPic[2] || currentPic[1] === currentPic[2] || Product.justViewed.indexOf(currentPic[2]) !== -1) {
        console.error('Duplicate at rignt');
        currentPic[2] = makeRandom();
    };

    //=========== Applying to the DOM =================//
    for (var i = 0; i < 3; i++) {
        Product.pics[i].src = Product.all[currentPic[i]].path;
        Product.pics[i].id = Product.all[currentPic[i]].name;
        Product.all[currentPic[i]].view += 1;
        Product.justViewed[i] = currentPic[i];
    };
};

//============ Adding an Event Listener to Keep track of clicks per image ==============//
function clicksPerPic(event) {
    if (Product.totalClicks > 24) {
        Product.container.removeEventListener('click', clicksPerPic);
        showTotals();
    };
    //This is how I direct a user to specific image
    if (event.target.id === 'image-container') {
        return alert('Need to click on image');
    }
    //Start to add up total clicks and log it
    Product.totalClicks += 1;
    for (var i = 0; i < Product.names.length; i++) {
        if (event.target.id === Product.all[i].name) {
            Product.all[i].votes += 1;
            console.log(event.target.id + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].view + ' views.');
        };
    };
    showPics();
};

//======== Show Total Clicks chart ===========//
function showTotals() {
    for (var i = 0; i < Product.all.length; i++) {
        var liEl = document.createElement('li');
        liEl.textContent = Product.all[i].name + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].view + ' view.';
        Product.tally.appendChild(liEl);
    };
};

//========= Event Listener ========// 
Product.container.addEventListener('click', clicksPerPic);
showPics();