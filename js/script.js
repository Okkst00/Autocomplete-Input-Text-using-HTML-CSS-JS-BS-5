
/* fungsi autcomplete mengambil dua argumen, elemen text field dan array nilai autocomplete */
function autoComp(input, arr) {
    
    var currentFocus;

    /*jalankan fungsi ketika seseorang menulis di text field*/
    input.addEventListener("input", function(e) {
        var a, b, i, val = this.value;

        /*tutup semua open list autocomplete yang sudah terbuka*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;

        /*buat elemen DIV yang akan berisi item (values)*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autoComp-list");
        a.setAttribute("class", "autoComp-items");

        /*tambahkan elemen DIV sebagai child dari autocomplete container*/
        this.parentNode.appendChild(a);

        /*for each item didalam array*/
        for (i = 0; i < arr.length; i++) {

          /*periksa apakah item dimulai dengan huruf yang sama dengan text field value*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            
            /*buat elemen DIV untuk setiap elemen yang cocok*/
            b = document.createElement("DIV");

            /*buat huruf yang cocok menjadi tebal*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);

            /*masukkan input field yang akan menyimpan nilai item array saat ini*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

            /*menjalankan fungsi ketika seseorang mengklik nilai item (elemen DIV)*/
            b.addEventListener("click", function(e) {

                /*masukkan nilai untuk autocomplete text field:*/
                input.value = this.getElementsByTagName("input")[0].value;

                /*tutup daftar autocompleted values, (atau daftar terbuka lainnya dari lists of autocompleted values*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });

    /*menjalankan fungsi menekan tombol pada keyboard*/
    input.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autoComp-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {

          /*jika tombol panah BAWAH ditekan, tingkatkan variabel currentFocus*/
          currentFocus++;

          /*buat item saat ini lebih terlihat*/
          addActive(x);
        } else if (e.keyCode == 38) { //keatas
          
          /*Jika tombol panah UP ditekan, kurangi variabel currentFocus*/
          currentFocus--;

          /*buat item saat ini lebih terlihat*/
          addActive(x);
        } else if (e.keyCode == 13) {

          /*Jika tombol ENTER ditekan, cegah formulir dikirimkan*/
          e.preventDefault();
          if (currentFocus > -1) {

            /*simulasikan klik pada "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });

    function addActive(x) {

      /*fungsi untuk mengklasifikasikan item sebagai "active"*/
      if (!x) return false;

      /*mulai dengan menghapus kelas "active" pada semua item*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);

      /*tambahkan kelas "autocomplete-active":*/
      x[currentFocus].classList.add("autoComp-active");
    } 

    function removeActive(x) {

      /*fungsi untuk menghapus kelas "aktif" dari semua autocomplete items*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autoComp-active");
      }
    }
    
    function closeAllLists(elmnt) {

      /*tutup semua daftar pautocomplete dalam dokumen, kecuali yang lulus sebagai argumen*/
      var x = document.getElementsByClassName("autoComp-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != input) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }

    /*menjalankan fungsi ketika seseorang mengklik dokumen*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  

  var countries = 
  
    [ 
      "Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas",
      "Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands",
      "Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia",
      "Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador",
      "Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies",
      "Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras",
      "Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati",
      "Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia",
      "Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar",
      "Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine",
      "Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino",
      "Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea",
      "South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand",
      "Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America",
      "Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"
  ];
  
  autoComp(document.getElementById("myInput"), countries);
