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
    const tag1 = orm.em.create(Tag, { slug: "slug1" })
    const tag2 = orm.em.create(Tag, { slug: "slug2" })
    const tag3 = orm.em.create(Tag, { slug: "slug3" })
    const tag4 = orm.em.create(Tag, { slug: "slug4" })
    for (let i = 0; i < 10; i++) {
        const product = orm.em.create(Product, {
            name: "product" + i,
            tags: [tag,tag1,tag2,tag3,tag4]
        })
        products.push(product)
    }
    await orm.em.persist(tag).persist(tag2).persist(products).flush();
    await orm.em.clear()
    const result = await orm.em.getRepository(Product).find({ tags: { slug: {$in:["slug0"]} } } as any, ['tags'], {}, 10, 8)
    console.log("---------Only one tag here  :----------")
    console.log(result[0].tags);
    await orm.em.clear()

    const result2 = await orm.em.getRepository(Product).find({ tags: { slug: ["slug0"] } } as any, [], {}, 10, 9)
    const result3 = await orm.em.populate(result2,['tags'])
    console.log("---------If poplate in line 31, the result are correct:----------")
    console.log("This is our expected result");
    console.log(result3[0].tags);
}
main();