import { MikroORM, QueryOrder } from "@mikro-orm/core";
import { Product } from "./entities/product.entity";
import { Tag } from "./entities/tag.entity";

const main = async () => {
    const orm = await MikroORM.init();
    const generator = orm.getSchemaGenerator();
    await generator.dropSchema();
    await generator.updateSchema();
    let products = [];
    const tag = orm.em.create(Tag, { slug: "slug0" })
    const tag2 = orm.em.create(Tag, { slug: "slug2" })
    for (let i = 0; i < 10; i++) {
        const product = orm.em.create(Product, {
            name: "product" + i,
            tags: [tag, tag2]
        })
        products.push(product)
    }
    await orm.em.persist(tag).persist(tag2).persist(products).flush();
    await orm.em.clear()
    const result = await orm.em.getRepository(Product).find({ tags: { slug: ["slug0"] } } as any, ['tags'], {}, 10, 8)
    console.log("---------If multiple products are found, there are tags:----------")
    console.log(result[0].tags);
    await orm.em.clear()
    const result2 = await orm.em.getRepository(Product).find({ tags: { slug: ["slug0"] } } as any, ['tags'], {}, 10, 9)
    console.log("---------If only one product is found, there has no tag:----------")
    console.log(result2[0].tags);
}
main();