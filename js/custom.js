//1.pravljenje ajax rikvesta
let xhttp=new XMLHttpRequest();

xhttp.onreadystatechange=function(){
    if(this.readyState==4 && this.status==200){
        //3.dodajem sve proizvode koji su ispisani u bazi
        let obj=JSON.parse(this.responseText);
        //4.dodavanje naziva
        let blogEl=document.getElementById("blog");
        let html="";
        for(let i=0; i<obj.length; i++){
            //6.ispis html
            html+="<div class='col-md-4'>"+
            "<div class='card'>"+
            "<img src='"+obj[i].avatar+"'>"+
            "<div class='card-body'>"+
            "<h5 class='card-title'>"+obj[i].name+"</h5>"+
            //7. dodajemo button
            "<button onclick='add_to_cart(this)' class='btn btn-primary'id='"+obj[i].id+"'>Add to Card</button>"+
            "<button onclick='see_more(this)' class='btn btn-info' id='"+obj[i].id+"' data-toggle='modal' data-target='#seeMoreModal'>See more</button>"+

            "</div>"+
            "</div>"+
            "</div>"
        } 
        //5. nalepim na html te nazive    
        blogEl.innerHTML=html;
    }
   

}
//2.slanje rikvesta
xhttp.open("GET", "https://6295d8d7810c00c1cb693302.mockapi.io/api/blog",true);
xhttp.send();

//11 funkcija add_to_cart
function add_to_cart(el){
    let id=el.getAttribute("id");

    let xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            let obj=JSON.parse(this.responseText);

            document.getElementById("myCart").innerHTML+="<div class='row' id='cart-item"+obj.id+"'>"+
                                                        "<div class='col-md-4'><b>Name: </b>"+obj.name+"</div>"+
                                                        "<div class='col-md-4'><b>Date: </b>"+obj.createdAt+"</div>"+
                                                        "<div class='col-md-4'><button onclick='remove_from_cart(this)' id='"+obj.id+"' type='button' class='btn btn-danger'>RemoveFromCart</button></div>"+
                                                        "</div>";
        }
    }
    xhttp.open("GET", "https://6295d8d7810c00c1cb693302.mockapi.io/api/blog/"+id, true);
    xhttp.send();
    
}

function see_more(el){
    //8.pozivam id pod njegovim rednim brojem
    let id=el.getAttribute("id");
    //9. prikaz id za svaku sliku

    let xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
            let obj=JSON.parse(this.responseText);

            //10.dodajem podatke na osnovu productDetails izmene u butstrap modulu
            document.getElementById("productDetails").innerHTML=obj.createdAt;
        }

    }
    xhttp.open("GET", "https://6295d8d7810c00c1cb693302.mockapi.io/api/blog/"+id, true);
    xhttp.send();

}
function remove_from_cart(el){
    let id=el.getAttribute("id");
    document.getElementById("cart-item"+id).remove();
    
}