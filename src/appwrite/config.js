import { conf } from "../conf/conf";
import { Client,ID,Databases } from "appwrite";

class Service {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL) // ✅ Make sure this is not undefined
      .setProject(conf.appwriteProjectId); // ✅ Make sure this is not undefined

    this.databases = new Databases(this.client); // ✅ This must be defined
  }

  async createProduct(name, sku, price, quantity, category) {
    try {
      const product = await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionsProducts, // 👈 use correct collection ID
        ID.unique(),
        {
          name,
          sku,
          price,
          quantity,
          category
        }
      );
      console.log("Product created:", product);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  }

  async loadProducts() {
    try {
      const products = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        'products'
      );
      return products.documents;
    } catch (error) {
      console.error("Error loading products:", error);
      return [];
    }
  }

  async updateProduct(productId, updatedData) {
    try {
      const product = await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        'products',
        productId,
        updatedData
      );
      console.log("Product updated:", product);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  async deleteProduct(productId) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        'products',
        productId
      );
      console.log("Product deleted:", productId);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

}
const service= new Service();
export default service;