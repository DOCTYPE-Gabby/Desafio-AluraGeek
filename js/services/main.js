import { productsAPI } from "./products-services.js";

const productContainer = document.querySelector("[data-list]");
const form = document.querySelector("[data-forms]"); 

function createCard({ productname, price, image, description, id }) {
    const card = document.createElement("li");
    card.classList.add("Product-card");

    card.innerHTML = `
        <img src="${image}" alt="${productname}">
        <h4>${productname}</h4>
        <h5>R$: ${price}</h5>
        <p>${description}</p>
    `;

    return card;
}

const renderProducts = async () => {
    try {
        const listProducts = await productsAPI.productsList();
        listProducts.forEach((product) => {
            const productCard = createCard(product);
            productContainer.appendChild(productCard);
        });
    } catch (error) {
        console.log("Erro ao renderizar produtos:", error);
    }
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();


    const productname = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const description = document.querySelector("[data-description]").value;
    const image = document.querySelector("[data-image]").value;

    try {
      
        const newProduct = await productsAPI.createProduct(productname, price, image, description);

    
        const newCard = createCard(newProduct);
        productContainer.appendChild(newCard);


        form.reset();
    } catch (error) {
        console.log("Erro ao criar produto:", error);
    }
});

const createProduct = async (productname, price, image, description) => {
    try {
        const response = await fetch("http://localhost:3001/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productname, price, image, description }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Erro ao criar produto");
    }
};

renderProducts();



const deleteButton = document.querySelector("#Delete");
deleteButton.addEventListener("click", async () => {
    const nameToDelete = document.querySelector("[data-name]").value.toLowerCase();

    try {
      
        const products = await productsAPI.productsList();

        const product = products.find(product => product.productname.toLowerCase() === nameToDelete);

        if (product) {
            
            await deleteProduct(product.id); 

            
            alert(`Produto ${product.productname} excluído com sucesso!`);
            renderProducts(); 
        } else {
            alert("Produto não encontrado!");
        }
    } catch (error) {
        console.log("Erro ao excluir produto:", error);
    }
});

const deleteProduct = async (id) => {
    try {
        await fetch(`http://localhost:3001/products/${id}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.log("Erro ao deletar produto:", error);
    }
};
