//showing data to modal for edit record
      $(document).ready(function(){
        $('#mytable').on('click','.edit',function(){
          var product_id    = $(this).data('id');
          var product_name  = $(this).data('product_name');
          var product_price = $(this).data('product_price');
          var product_image = $(this).data('product-image');
          //alert(product_image);
          $('#EditModal').modal('show');
          $('.product_name').val(product_name);
          $('.price').val(product_price);
          // $('.product_image').val(product_image);
          // $('#profile-img-tag').src = "./upload/" + product_image;
          document.getElementById("profile-img-tag").src = "./upload/" + product_image;
          console.log("'./upload/" + product_image + "'");
          //html('<img src="./upload/'+ product_image+ '" alt="test" height="100" width="150">');
          $('.product_id').val(product_id);
        });

//showing data to modal for delete record
          $('#mytable').on('click','.delete',function(){
            var product_id = $(this).data('id');
            $('#DeleteModal').modal('show');
            $('.product_id2').val(product_id);
        });
        });
//showing data to modal for Image/File Upload record
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                   document.getElementById("profile-img-tag").src = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
       $(".product_image").change(function(){
        //alert('test');
        readURL(this);
        });
       function readURL2(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                   document.getElementById("profile-img-tag1").src = e.target.result;
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
       $(".add_image").change(function(){
        //alert('test');
        readURL2(this);
        });