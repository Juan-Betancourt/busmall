'use strict';
Product.names = ['Bag', 'Banana', 'Bathroom', 'Boots', 'Breakfast', 'Bubblegum', 'Chair', 'Cthulhu', 'Dog-duck', 'Dragon', 'Pen', 'Pet-sweep', 'Scissors', 'Shark', 'Sweep', 'Tauntaun', 'Unicorn', 'Usb', 'Water-can', 'Wine-glass'];
Product.container = document.getElementById('image-container');
Product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
Product.tally = document.getElementById('total-clicks');
Product.all = [];
Product.justViewed = [];
Product.totalClicks = 0;

//========== Create Constructor ============//
function Product(name) {
    this.name = name;
    if (name === 'Sweep') {
        this.path = 'img/' + name + '.png';
    } else if (name === 'Usb') {
        this.path = 'img/' + name + '.gif';
    } else {
        this.path = 'img/' + name + '.jpg';
    }
    this.path;
    this.votes = 0;
    this.view = 0;
    Product.all.push(this);
};

function cycleNames() {
    for (var i = 0; i < Product.names.length; i++) {
        new Product(Product.names[i]);
    };
};

//========== Make Random Generator for Products========//
function makeRandom() {
    return Math.floor(Math.random() * Product.names.length);
};

//========= Create Three Pics that Display Randomly=====//
function showPics() {
    var currentPic = [];
    Product.votesData = [];
    for (var j = 0; j < Product.name.length; j++)
        Product.votesData.push(Product.all[j].votes)

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
        console.error('Duplicate at right');
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
    if (Product.totalClicks > 23) {
        Product.container.removeEventListener('click', clicksPerPic);
        makeChart();
        localStorage.clear();
    };
    var productStringify = JSON.stringify(Product.all);
    localStorage.setItem('products', productStringify);


    Product.all = JSON.parse(productStringify);

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
        var productTotalClicks = JSON.stringify(Product.totalClicks);
        localStorage.setItem('click', productTotalClicks);
    };
    showPics();
};
if (localStorage.products) {
    var getClick = localStorage.getItem('click');
    Product.totalClicks = JSON.parse(getClick);
}
// //======== Show Total Clicks chart ===========//
// function showTotals() {
//     for (var i = 0; i < Product.all.length; i++) {
//         var liEl = document.createElement('li');
//         liEl.textContent = Product.all[i].name + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].view + ' view.';
//         Product.tally.appendChild(liEl);
//     };
// };

//============ Visual Chart =================//
function makeChart() {
    var totalVotes = [];
    var productNames = [];
    var labelColors = ['red', 'blue', 'yellow', 'green', 'purple', 'orange', 'red', 'blue', 'yellow', 'green', 'purple', 'orange', 'red', 'blue', 'yellow', 'green', 'purple', 'orange', 'red', 'blue'];
    var ctx = document.getElementById('graph').getContext('2d');
    for (var i = 0; i < Product.all.length; i++) {
        totalVotes[i] = Product.all[i].votes;
        productNames[i] = Product.all[i].name;
    }
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Product.names,
            datasets: [{
                label: '# of votes for each product',
                data: totalVotes,
                backgroundColor: labelColors
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    })
}

//========= Event Listener ========// 
Product.container.addEventListener('click', clicksPerPic);
cycleNames();
showPics();