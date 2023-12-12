import {BrowserRouter, Route, Routes} from "react-router-dom";
import Products from "./products/products";
import React from "react";
import Layout from "./Menu";
import Helloworld from "./HelloWorld";

function App() {
    return(<body><div className={"Wrapper"}><BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Helloworld />}/>
          <Route path="products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter></div>
    </body>)
}

export default App;
