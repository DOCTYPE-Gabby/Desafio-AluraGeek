const baseURL = "http://localhost:3001/products"

const productsList = async () => {
    try {
        const response = await fetch(baseURL);
        const data = await response.json()
        return data
    } catch (error) {
        console.log("Erro ao buscar produtos>")
    }
}

export const productsAPI = {
    productsList: async () => {
        try {
            const response = await fetch("http://localhost:3001/products");
            return await response.json();
        } catch (error) {
            console.log("Erro ao obter a lista de produtos:", error);
        }
    },
    createProduct: async (productname, price, image, description) => {
        try {
            const response = await fetch("http://localhost:3001/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productname, price, image, description }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Erro ao criar produto:", error);
        }
    },
};
