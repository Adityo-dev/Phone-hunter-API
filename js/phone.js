// fetch('https://jsonplaceholder.typicode.com/todos/1')
//     .then(response => response.json())
//     .then(json => console.log(json))

const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
    // 1. get container valu 
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.innerHTML = '';

    //   display show all button of threr are more than 12 phones----->
    const showAllContainer = document.getElementById('Show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }

    // display only first 12 phone if not show all --->
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // 2. create a div
        const phoneCaed = document.createElement('div');
        phoneCaed.classList = `card bg-gray-50 pt-6 shadow-xl text-neutral-600	`;
        // 3. set inner html
        phoneCaed.innerHTML = `
        <figure><img class=""  src="${phone.image}"alt="Shoes" /></figure>
        <div class="card-body">
        <h2 class="card-title text-[19px] md:text-2xl">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
        <button onclick='handleShowDetail("${phone.slug}")' class="btn btn-primary text-white">Show Details</button>
        </div>
        </div>
        `;
        //4. append Child
        phoneContainer.appendChild(phoneCaed);
    })
    //hide loading spinner
    toggleLogingSpinner(false);
};

// 
const handleShowDetail = async (id) => {
    // console.log('handleShowDetail', id);
    // load single phone data 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone)
}
// display phone details --->
const showPhoneDetails = (phone) => {
    console.log(phone);

    const showDetailContainer = document.getElementById('Show-detail-container');
    showDetailContainer.innerHTML = `
    <p class="flex justify-center bg-teal-50 py-4 px-6 md:py-6 w-[60%] md:w-[90%] mx-auto rounded-md"><img src ="${phone.image}" alt= ""/></P>
    <h3 class="font-semibold text-[22px] md:text-3xl mt-6">${phone.name}</h3>
    <p class="mt-3 text-[13px] md:text-[15px] "><span class="text-[16px] md:text-[18px] font-semibold">Storage: </span> ${phone?.mainFeatures?.storage}</p>
    <p class="mt-1 text-[13px] md:text-[15px] "><span class=" text-[16px] md:text-[18px] font-semibold">Display Size: </span> ${phone?.mainFeatures?.displaySize}</p>
    <p class="mt-1 text-[13px] md:text-[15px] "><span class=" text-[16px] md:text-[18px] font-semibold">ChipSet : </span> ${phone?.mainFeatures?.chipSet}</p>
    <p class="mt-1 text-[13px] md:text-[15px] "><span class=" text-[16px] md:text-[18px] font-semibold">Memory: </span> ${phone?.mainFeatures?.memory}</p>
    <p class="mt-1 text-[13px] md:text-[15px] "><span class=" text-[16px] md:text-[18px] font-semibold">Brand: </span> ${phone?.brand}</p>
    <p class="mt-1 text-[13px] md:text-[15px] "><span class=" text-[16px] md:text-[18px] font-semibold">GPS: </span> ${phone?.others?.GPS}</p>

    `
    // show thw modal 
    show_details_modal.showModal()
}

// handle Search button
const handleSearch = (isShowAll) => {

    toggleLogingSpinner(true);

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}

// toggle Loging Spinner --------->
const toggleLogingSpinner = (isLoading) => {
    const loadgingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadgingSpinner.classList.remove('hidden');
    }
    else {
        loadgingSpinner.classList.add('hidden');
    }
}
// handle show all
const handleShowAll = () => {
    handleSearch(true)
}

loadPhone()