;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-weibo" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M730.47792 491.709885c0 0 129.105427-229.116211-244.296959-108.85829 46.810119-36.676317 39.247886-111.410416 2.514263-137.952932-136.705522-98.743932-470.802716 216.430284-470.802716 403.764903 0 113.905236 122.752742 262.011412 402.478608 262.011412 351.906815 0 461.994096-192.401008 461.994096-286.039665C882.365212 495.491001 730.47792 491.709885 730.47792 491.709885zM431.944709 861.389482c-163.92035 15.276938-305.192887-62.470797-315.500651-173.688831-10.422374-111.180172 114.058732-213.704197 278.017968-228.962715 163.92035-15.257495 305.192887 62.470797 315.53749 173.669388C720.345142 743.606938 595.902922 846.131987 431.944709 861.389482z"  ></path>' +
    '' +
    '<path d="M374.060371 538.980491c-88.763626 15.027252-150.274562 88.87926-137.377834 164.860768 12.858866 76.020394 95.212502 125.477806 183.976128 110.469997 88.724741-15.027252 150.2367-88.820931 137.377834-164.860768C545.138748 573.431118 462.823997 523.991102 374.060371 538.980491zM358.63096 755.832378c-28.67304 7.869225-57.80759-7.023974-65.080228-33.278941-7.196912-26.331715 10.191106-54.025451 38.826284-61.932538 28.67304-7.907087 57.80759 6.986111 65.041342 33.278941C404.653133 720.192669 387.302977 747.887428 358.63096 755.832378zM433.095929 671.425989c-14.739702 0-26.696012-11.918447-26.696012-26.65815 0-14.72026 11.95631-26.676569 26.696012-26.676569 14.739702 0 26.657126 11.975752 26.657126 26.676569C459.754079 659.507542 447.835631 671.425989 433.095929 671.425989z"  ></path>' +
    '' +
    '<path d="M950.689321 207.647247C891.769396 132.318608 797.343817 99.653651 684.878372 115.678626c-18.961864 2.687202-32.166607 20.24816-29.459962 39.228443 2.667759 18.922978 20.171412 32.070416 39.210024 29.421077 111.37153-15.890922 171.040515 27.13808 201.478757 66.059532 39.957037 51.14689 51.243081 124.039038 28.039613 181.327812-7.196912 17.752316 1.343601 37.981033 19.11536 45.159526 4.28049 1.727341 8.655124 2.552126 13.012362 2.552126 13.684674 0 26.657126-8.176217 32.127721-21.649066C1020.643556 378.227274 1005.500671 277.718139 950.689321 207.647247z"  ></path>' +
    '' +
    '<path d="M718.213595 241.521752c-18.885116 2.705622-32.088836 20.266579-29.383214 39.210024 2.705622 18.942421 20.171412 32.088836 39.210024 29.421077 31.858592-4.568039 56.67479 3.090385 71.567989 22.128997 13.414521 17.196661 17.388019 42.433438 9.749038 61.414745-7.196912 17.752316 1.382487 37.96159 19.11536 45.159526 4.317329 1.727341 8.655124 2.533706 13.012362 2.533706 13.684674 0 26.696012-8.176217 32.127721-21.649066 17.10047-42.145889 9.480932-93.235474-19.384489-130.161479C836.513932 266.893606 795.270599 230.504838 718.213595 241.521752z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-home" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M1016.291946 528.1007l0.013303-0.017396-491.534899-376.302435-0.054235 0.070608c-3.15997-2.194992-6.991228-3.488451-11.129478-3.488451-4.239558 0-8.151657 1.364067-11.353582 3.656273-0.99977 0.578168-1.946328 1.234107-2.823302 1.974981L9.045515 528.928554c-5.420453 3.474125-9.021467 9.537214-9.021467 16.452717 0 10.794857 8.750291 19.546172 19.545148 19.546172 4.470825 0 8.577353-1.517563 11.870352-4.042059l0.062422 0.080841 115.25907-88.12713 0 38.73214 0 287.421128c0 42.324968 34.997072 76.643588 78.161151 76.643588L800.338522 875.635951c43.164079 0 78.160127-34.31862 78.160127-76.643588l0-306.582537 0-20.496823 114.062825 87.224574 0.01228-0.016373c3.290953 2.520403 7.394411 4.033873 11.859096 4.033873 10.794857 0 19.546172-8.750291 19.546172-19.545148C1023.977999 537.281803 1020.957199 531.673062 1016.291946 528.1007zM839.41347 492.409826l0 306.582537c0 21.159926-17.482163 38.319747-39.074947 38.319747L224.921167 837.31211c-21.590737 0-39.070854-17.159822-39.070854-38.319747L185.850313 511.568165l0-68.61882 327.408865-250.338558 326.154291 249.411443L839.41347 492.409826z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-github" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M941.714 512q0 143.433-83.712 258.011t-216.283 158.574q-15.433 2.853-22.565-3.986t-7.131-17.152v-120.576q0-55.442-29.696-81.152 32.585-3.438 58.587-10.277t53.723-22.272 46.299-37.998 30.281-60.014 11.703-86.016q0-69.157-45.129-117.723 21.138-52.005-4.571-116.553-16.018-5.157-46.299 6.29t-52.553 25.161l-21.723 13.714q-53.138-14.848-109.714-14.848t-109.714 14.848q-9.143-6.29-24.283-15.433t-47.726-22.016-49.152-7.717q-25.161 64.585-3.986 116.553-45.129 48.567-45.129 117.723 0 48.567 11.703 85.723t29.989 60.014 46.007 38.29 53.723 22.272 58.587 10.277q-22.857 20.553-28.014 58.843-11.995 5.705-25.71 8.558t-32.585 2.853-37.413-12.288-31.707-35.73q-10.862-18.286-27.721-29.696t-28.27-13.714l-11.447-1.719q-11.995 0-16.567 2.56t-2.853 6.583 5.157 8.009 7.424 6.839l3.986 2.853q12.581 5.705 24.869 21.723t17.993 29.147l5.705 13.129q7.424 21.723 25.161 35.145t38.29 17.152 39.717 3.986 31.707-2.011l13.129-2.304q0 21.723 0.293 50.871t0.293 30.866q0 10.277-7.424 17.152t-22.857 3.986q-132.571-43.995-216.283-158.574t-83.712-258.011q0-119.442 58.843-220.27t159.707-159.707 220.27-58.843 220.27 58.843 159.707 159.707 58.843 220.27z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-3" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M681.398108 955.388343c-12.612249 0-25.286919-1.066285-37.662785-3.184529-46.306652-7.890714-85.020372-27.357068-110.574375-55.326073-13.866822 4.612041-30.149671 3.090385-40.314171-0.156566-25.428136 29.569456-69.412906 50.039673-120.691803 55.623855-90.809215 9.834996-162.810063-20.659529-169.994696-69.412906-5.945409-39.812751 36.408211-71.075779 81.820494-89.130993-19.921725-24.988114-35.106566-53.930283-43.74941-83.200934-24.722054 29.67895-45.977147 48.581462-70.087265 42.760896-8.03193-1.913583-19.326161-7.937786-27.624151-25.75764-16.439414-35.231409-16.078187-108.393709 16.972557-174.558641 13.364379-26.761504 32.000831-48.690956 47.529503-65.742307-5.881964-12.548804-11.576663-27.748994-11.576663-41.22389 0-22.274306 9.725502-41.694611 28.251438-56.691163-1.662873-12.706393-2.463098-24.424272-2.463098-35.560914 0-161.100118 127.98593-287.297308 291.376207-287.297308 161.695682 0 293.242717 128.880299 293.242717 287.297308l0.047072 7.843642c0.062422 8.126075 0.141216 17.004279-0.376577 25.505907 15.184841 11.105942 24.251334 26.729781 24.251334 58.902528 0 13.505595-1.160429 27.937283-7.921413 39.216163 13.035898 18.478863 27.38879 41.349757 40.314171 61.945841l2.77623 4.423753c31.027667 49.397037 34.165124 135.405923 16.156982 176.441525-8.079002 18.400069-19.043728 23.984251-26.839275 25.428136-3.670599 0.674359-7.199982 0.988514-10.604522 0.988514 0 0 0 0-0.01535 0-27.13808 0-45.003983-18.85544-60.659545-41.003879-9.459442 28.28316-24.612561 57.145511-42.400692 80.455403 53.082986 21.741163 80.707137 52.173267 76.518744 85.255733C811.628148 922.635381 753.289462 955.388343 681.398108 955.388343zM541.883611 856.015078l8.659217 11.544941c20.062941 26.745131 55.075363 45.553499 98.589412 52.988842 10.588149 1.787716 21.458731 2.713808 32.266891 2.713808 57.616232 0 100.958366-25.333992 103.82874-48.063669 2.51017-19.765159-27.65485-42.839691-76.831876-58.793034l-24.502044-7.953136 17.929348-18.510586c28.658713-29.569456 52.643987-78.05575 58.337663-117.883851l5.851265-40.910759 32.251541 47.529503c15.403828 23.466458 28.705785 43.718711 45.38056 43.718711 0.01535 0 0.01535 0 0.01535 0 1.537006 0 3.121084-0.156566 4.768607-0.455371 11.231809-8.203846 22.902616-99.70277-10.682293-153.178705l-2.792603-4.439102c-15.247262-24.313755-32.533974-51.859112-46.604434-70.510914l-10.541077-13.960966 14.808264-9.318226c4.376681-2.76088 5.03569-16.501836 5.03569-24.454972 0-27.059286-6.760984-30.918173-16.98893-36.737716l-9.474792-5.395894 1.521656-10.80816c1.254573-8.94165 1.160429-20.769023 1.066285-31.184233l-0.047072-8.126075c0-140.707672-117.130697-255.171634-261.117043-255.171634-145.366785 0-259.250532 112.079658-259.250532 255.171634 0 12.251022 1.12973 25.458835 3.482311 40.361243l1.600451 10.290367-8.721639 5.662977c-14.902408 9.710153-22.149463 21.458731-22.149463 35.93749 0 7.670703 4.376681 19.968797 13.004175 36.564777l5.207605 10.007935-7.670703 8.29799c-16.188704 17.505699-36.314067 39.294958-49.883107 66.447365-26.776853 53.616128-29.616528 117.522624-16.894785 145.978722 2.964518 6.65149 5.693676 8.580422 6.274914 8.736988 0.031722 0 0.062422 0 0.109494 0 11.827373 0 31.278377-23.906479 50.086745-47.043433l33.098839-40.392966 4.203742 37.882795c4.454452 40.329521 26.776853 85.272106 58.228169 117.318986l18.697851 19.043728-25.584702 7.608282c-50.071396 14.870686-85.538165 41.380456-82.511225 61.695131 4.297886 29.349445 65.506946 49.726541 134.731564 42.180681 47.859008-5.207605 87.295182-24.674982 105.476263-52.079122l5.082762-7.655354 12.423961 0.674359 4.220115 2.007727c4.314259 2.086521 21.019733 7.576559 33.600259 0.047072L541.883611 856.015078z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-1111111" viewBox="0 0 1317 1024">' +
    '' +
    '<path d="M1290.25548 86.326631l25.79995-38.699924-25.79995-38.699924-1264.197531 0-25.79995 38.699924 25.79995 38.699924L1290.25548 86.326631zM26.057949 473.325876l-25.79995 38.699924 25.79995 38.699924 1264.197531 0 25.79995-37.900126-25.79995-39.499723L26.057949 473.325876zM26.057949 937.724969l-25.79995 37.100328 25.79995 40.299521 1264.197531 0 25.79995-38.699924-25.79995-38.699924L26.057949 937.724969z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-left" viewBox="0 0 1026 1024">' +
    '' +
    '<path d="M436.726619 950.063057c-1.438769-1.77339-2.732228-3.692089-4.335748-5.299703C290.482861 802.608727 148.552338 660.477636 6.581905 518.385431c-1.632173-1.633197-3.827165-2.706645-5.759167-4.042059 0.001023-0.836041 0.00307-1.673106 0.004093-2.51017 1.932002-1.335415 4.124947-2.410909 5.757121-4.046153 141.971455-142.091182 283.900955-284.223297 425.807942-426.377924 1.603521-1.605567 2.895957-3.524267 4.333702-5.297656 0.36225 0 0.724501 0 1.086751 0 3.462868 3.65218 6.850012 7.382131 10.400884 10.946306 19.044752 19.122523 38.115086 38.219463 57.231469 57.269331 1.39272 1.388627 3.215228 2.347464 5.77861 4.178159C388.813377 270.443455 267.496333 391.288754 145.779178 512.535189c122.178667 121.714086 243.401566 242.475474 365.007181 363.618555-2.346441 2.482541-3.635807 3.913123-4.993734 5.27412-21.497617 21.536502-43.007513 43.058678-64.494896 64.606437-1.251503 1.25355-2.326998 2.681062-3.485381 4.028757C437.45112 950.063057 437.087846 950.063057 436.726619 950.063057z"  ></path>' +
    '' +
    '<path d="M951.965383 76.111468c14.490016 14.663978 28.952402 29.356608 43.479257 43.9817 9.42772 9.492188 18.950607 18.889209 29.272697 29.169343C903.068743 270.406616 781.752724 391.222239 659.933237 512.537236c122.286114 121.772414 243.518223 242.49287 365.126908 363.589902-2.40477 2.542916-3.694135 3.973498-5.054109 5.335519-21.494547 21.535479-43.001373 43.057655-64.48978 64.599274-1.257643 1.25969-2.368954 2.664689-3.549849 4.001127-0.36225 0-0.724501 0-1.086751 0-1.280156-1.65264-2.399653-3.466961-3.864004-4.933359-142.16486-142.408407-284.352233-284.793278-426.580538-427.13824-1.506307-1.50733-3.563152-2.464121-5.597485-3.835352 2.565429-2.712785 3.873214-4.164856 5.252631-5.54632C662.273539 366.220822 804.465005 223.840044 946.628842 81.431637c1.594311-1.596358 2.840698-3.538593 4.249791-5.320169C951.240883 76.111468 951.603133 76.111468 951.965383 76.111468z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-category" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M426.889051 541.919677 171.556202 541.919677C140.216889 541.919677 114.813414 567.328323 114.813414 598.661172l0 255.332848c0 31.33802 25.408646 56.742788 56.742788 56.742788l255.332848 0c31.332848 0 56.742788-25.408646 56.742788-56.742788L483.631838 598.661172C483.631838 567.328323 458.221899 541.919677 426.889051 541.919677L426.889051 541.919677zM455.257212 854.000485c0 15.666424-12.686222 28.373333-28.368162 28.373333L171.556202 882.373818c-15.681939 0-28.374626-12.706909-28.374626-28.373333L143.181576 598.661172c0-15.666424 12.692687-28.368162 28.374626-28.368162l255.332848 0c15.681939 0 28.368162 12.701737 28.368162 28.368162L455.257212 854.000485 455.257212 854.000485zM852.450263 116.363636 597.110949 116.363636c-31.33802 0-56.742788 25.408646-56.742788 56.741495l0 255.334141c0 31.332848 25.408646 56.741495 56.742788 56.741495l255.332848 0c31.332848 0 56.742788-25.408646 56.742788-56.741495L909.186586 173.105131C909.186586 141.772283 883.783111 116.363636 852.450263 116.363636L852.450263 116.363636zM880.818424 428.439273c0 15.666424-12.691394 28.373333-28.368162 28.373333L597.110949 456.812606c-15.681939 0-28.373333-12.701737-28.373333-28.373333L568.737616 173.105131c0-15.666424 12.691394-28.373333 28.373333-28.373333l255.332848 0c15.681939 0 28.373333 12.701737 28.373333 28.373333L880.817131 428.439273 880.818424 428.439273 880.818424 428.439273zM852.450263 541.919677 597.110949 541.919677c-31.33802 0-56.742788 25.408646-56.742788 56.742788l0 255.332848c0 31.33802 25.408646 56.742788 56.742788 56.742788l255.332848 0c31.332848 0 56.742788-25.408646 56.742788-56.742788L909.186586 598.661172C909.186586 567.328323 883.783111 541.919677 852.450263 541.919677L852.450263 541.919677zM880.818424 854.000485c0 15.666424-12.691394 28.373333-28.368162 28.373333L597.110949 882.373818c-15.681939 0-28.373333-12.706909-28.373333-28.373333L568.737616 598.661172c0-15.666424 12.691394-28.368162 28.373333-28.368162l255.332848 0c15.681939 0 28.373333 12.701737 28.373333 28.368162L880.817131 854.000485 880.818424 854.000485 880.818424 854.000485zM426.889051 116.363636 171.556202 116.363636C140.216889 116.363636 114.813414 141.772283 114.813414 173.105131l0 255.334141c0 31.332848 25.408646 56.741495 56.742788 56.741495l255.332848 0c31.332848 0 56.742788-25.408646 56.742788-56.741495L483.631838 173.105131C483.631838 141.772283 458.221899 116.363636 426.889051 116.363636L426.889051 116.363636zM455.257212 428.439273c0 15.666424-12.686222 28.373333-28.368162 28.373333L171.556202 456.812606c-15.681939 0-28.374626-12.701737-28.374626-28.373333L143.181576 173.105131c0-15.666424 12.692687-28.373333 28.374626-28.373333l255.332848 0c15.681939 0 28.368162 12.701737 28.368162 28.373333L455.257212 428.439273 455.257212 428.439273zM455.257212 428.439273"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-jian" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M206.28949 0 290.563307 26.480867C279.326741 50.019533 269.494895 73.557847 261.067471 97.096513L518.102609 97.096513 518.102609 180.952592 370.623431 180.952592C393.096561 210.375925 415.569354 242.741105 438.042484 278.049105L349.554977 326.597361C327.081848 276.577696 301.799956 228.029925 273.708543 180.952592L218.930563 180.952592 172.579964 255.981716C155.725117 279.520382 133.252324 306.000984 105.160912 335.424317L29.314477 278.049105C110.779573 195.663773 169.770655 102.981665 206.28949 0L206.28949 0ZM644.513333 0 724.573458 26.480867C716.146034 50.019533 706.314187 73.557847 695.077623 97.096513L994.249666 97.096513 994.249666 180.952592 821.488345 180.952592C843.961477 210.375925 863.625173 241.269961 880.480019 273.635627L804.63358 322.183883C779.351312 272.164218 752.664867 225.087591 724.573458 180.952592L657.154405 180.952592C629.062993 233.914591 592.544705 283.933507 547.598445 331.010839L471.75201 273.635627C550.407965 191.250295 607.994497 100.039331 644.513333 0L644.513333 0ZM252.640089 308.94345C291.968067 347.193782 324.272706 388.385831 349.554977 432.52083L269.494853 476.655608C249.830864 435.462942 220.335323 394.270894 181.007346 353.078229L252.640089 308.94345ZM395.905576 348.664751 939.471685 348.664751 939.471685 904.762964C939.471685 943.013295 931.044394 972.436184 914.189541 993.032517 897.334696 1013.62885 872.052801 1023.926862 838.34311 1023.926862 810.251698 1023.926862 776.542505 1022.455721 737.214527 1019.513387L716.146076 935.657302C761.092333 938.599636 797.610626 940.070785 825.702038 940.070785 845.366027 940.070785 855.197875 919.474759 855.197875 878.282094L855.197875 423.693874 395.905576 423.693874 395.905576 348.664751ZM109.374602 467.828652 193.648418 467.828652 193.648418 1023.926862 109.374602 1023.926862 109.374602 467.828652ZM703.505004 516.376909 703.505004 895.936005 315.845451 895.936005 315.845451 516.376909 703.505004 516.376909ZM623.444879 666.435156 623.444879 591.406033 395.905576 591.406033 395.905576 666.435156 623.444879 666.435156ZM395.905576 737.050801 395.905576 820.906879 623.444879 820.906879 623.444879 737.050801 395.905576 737.050801Z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-about-copy" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M699.607 871.067l-364.281-0.172c-51.387-5.862-148.632-43.925-148.632-146.213v-204.429c-31.765-20.656-94.323-69.87-94.323-136.758 0-69.698 44.468-132.863 125.173-177.85 76.307-42.515 181.111-65.925 295.064-65.925 251.362 0 420.194 126.066 420.194 243.774 0 71.75-49.812 115.235-99.894 134.316v196.343c-0.024 63.078-35.497 156.913-133.301 156.913v0zM340.494 812.875h359.089c74.28 0 75.148-94.689 75.148-98.721v-240.611l22.243-5.362c18.188-4.435 77.589-23.539 77.589-84.685 0-77.516-137.662-185.589-362.002-185.589-203.013 0-362.027 81.522-362.027 185.589 0 39.967 49.959 78.53 79.447 95.018l14.877 8.318v237.85c-0.001 71.798 83.152 86.434 95.636 88.192v0z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)