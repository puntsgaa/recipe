require("@babel/polyfill");
import Search from "./model/Search";
let search = new Search("poke");

search.doSearch().then(r => console.log(r));