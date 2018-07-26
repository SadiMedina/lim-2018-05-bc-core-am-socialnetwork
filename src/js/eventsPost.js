let uidPost;
let elementoUpdate = document.getElementsByClassName('update');
let elementoDelete = document.getElementsByClassName('delete');
let elementoLike = document.getElementsByClassName('icon-heart');
//.............................................................................CERRAR SESION
eventsPost = () => {
  let userId = firebase.auth().currentUser;;
  for (let index = 0; index < elementoDelete.length; index++) {
    elementoDelete[index].addEventListener('click', () => {
      let dataDeletePost = elementoDelete[index].getAttribute("data-posts");
      let refDelete = firebase.database().ref('posts/' + dataDeletePost);
      refDelete.once('value', data => {
        let dataPost = data.val();
        if (dataPost.uidUser == userId.uid) {
          $('#div_delete_post').append(deletePostElement(dataPost.content, dataDeletePost));
          $(".form_delete_post").show();
          eventsDeletePost();
        }
      })
    }, false);
  }  
for (let index = 0; index < elementoUpdate.length; index++) {
    elementoUpdate[index].addEventListener('click', () => {
      let dataUserUpdate = elementoUpdate[index].getAttribute("data-posts");
      refUsersUpdate = firebase.database().ref('posts/' + dataUserUpdate);//post
      refUsersUpdate.once('value', function (snap) {
        var datos = snap.val();
        if (datos.uidUser == userId.uid) {
          $('#div_new_post').append(newInsertPost(dataUserUpdate, datos.content));
          document.getElementById('input-post').value = datos.content;
          $("#input-post").disabled = true;
          $('#send-post').hide();
          $('#edit-post').show();
          eventsUpdatePost();
        }
      });
    });
  }
  for (let index = 0; index < elementoLike.length; index++) {
    elementoLike[index].addEventListener('click', () => {
      let dataLikePost = elementoLike[index].getAttribute("data-posts");
      Like(dataLikePost);
    }, false);

  }

  $('#btnLogOut').click(() => {//imagen profile
    $('#hint_menu_account').show();
  });
  $('#li_logout').click(() => {
    firebase.auth().signOut();
  });
  $('#view-input-post').click(() => {
    console.log(new Date());
    document.getElementById('div_new_post').innerHTML = '';
    $('#div_new_post').append(newInsertPost(null, ''));
    $("#input-post").disabled = true;
    eventsGetPost();
  });
  $('#header_my_account').click(() => {//ver perfil
    document.getElementById('items-post').innerHTML = '';
    let uidUser=$('#header_my_account').attr('data-posts');
    viewMyAccount(uidUser);
    $('#hint_menu_account').hide();
  });
  $('.content-search-user').click(e=>{
    let element = event.target;
    document.getElementById('items-post').innerHTML = '';
    viewMyAccount(element.id);
    $('.content-search-user').hide();
  });
  //
  $('.icon-home2').click(() => {// ir al home2
    document.getElementById('items-post').innerHTML = '';
    viewPost();
  });
  $('.search-input').keyup(function (e) {
    $('.content-search-user').show();
    let value = event.target.value;
    let objetouser;
    objetouser = searchUsers(value);// envio los datos
    listarUsuarios(objetouser);// enviar a imprimir
  });
  const listarUsuarios = data => {     
    data.on('value', datos=>{
      document.getElementById('content-search-user').innerHTML = ''; 
      let dataUser=datos.val();
      for (const key in dataUser) {  
        //document.getElementById('content-search-user').innerHTML += searchElement(data[key].usersName, key);
        document.getElementById('content-search-user').innerHTML += searchElement(dataUser[key].usersName, key);
      }
    });   
  }

}







