const check_login = async () => {
    const response = await fetch("/auth/check", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }});
    const json = await response.json();
    if (json === 0) {
        window.location.replace("/login");
    }
    return json;
}

const status_ = (stat) => {
    switch (stat) {
        case 0:
            return "배송준비중";
        case 1:
            return "배송중";
        case 2:
            return "배송완료";
        default:
            return "배송준비중";
    }
}

const get_delivery = (id) => {
    console.log(id);

    fetch(`/api/delivery/user/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((json) => {
        let delivery = json;
        let delivery_list = document.querySelector(".delivery-list");
        delivery.forEach((item) => {
            let delivery_item = document.createElement("li");
            delivery_item.classList.add("delivery-item");
            delivery_item.innerHTML = `
                <div class="delivery-item__name">${item.name}</div>
                <div class="delivery-item__address">${item.address}</div>
                <div class="delivery-item__company">${item.company}</div>
                <div class="delivery-item__code">${item.code}</div>
                <div class="delivery-item__status">${status_(item.status)}</div>
                
            `;
            delivery_list.appendChild(delivery_item);
        })
    })
}


const main = async () => {
    let data = await check_login();
    get_delivery(data.id);
}

main();