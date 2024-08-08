import DB_connection from "../DB/connection.js"
import { globalResponse } from "./middlewares/global-response.middleware.js"
import { rollbacksaveddocuments } from "./middlewares/rollback-saved-documnets.middleware.js"




import * as  routers from './modules/index.routes.js'


export const initiateApp = (app, express) => {

    const port = process.env.PORT


    app.use(express.json())

    DB_connection()
    app.use('/auth', routers.authrouter)
    app.use('/admin', routers.userrouter)
    app.use('/category', routers.categoryrouter)
    
    app.use('/wishlist',routers.wishlistrouter)
    app.use('/product',routers.productrouter)


    app.use(globalResponse,rollbacksaveddocuments)
   
 
    app.get('/', (req, res) => res.send('Hello World!'))
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))

}