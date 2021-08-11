var svg = document.getElementById("svg");

            if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
                window.location.href = "https://toto0121.github.io/spiky_mobile.html";
            }
            
            window.addEventListener('load', init);

    function init() {

      // サイズを指定
      let width = window.innerWidth;
      let height = window.innerHeight;
    const theta = THREE.Math.degToRad(90);
    let cleared = false;
    

      // レンダラーを作成
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);

      // シーンを作成
      const scene = new THREE.Scene();

      // カメラを作成
      let camera = new THREE.PerspectiveCamera(45, width / height);
      camera.position.set(0, 0, +1000);

      //背景を作成
        const planeGeometry = new THREE.PlaneGeometry(2000, 1000);
        const planeMaterial = new THREE.MeshStandardMaterial({color: 0xF0E68C});
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(0,0,-100);
        scene.add(plane);

        //clear text

        let textC;
        let btnT;
        function setTweetButton(text){

            var text2 = document.createElement('div');
            textC = text2;
            text2.style.position = 'absolute';
            //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
            text2.style.width = 100;
            text2.style.height = 100;
            //text2.style.backgroundColor = "blue";
            text2.innerHTML = "congratulations!";
            text2.style.color = "red";
            document.body.appendChild(text2);
            // htmlでスクリプトを読んでるからtwttがエラーなく呼べる
            // オプションは公式よんで。
            twttr.widgets.createShareButton(
              "",
              document.getElementById("tweet-area"),
              {
                text: text, // 狙ったテキスト
                hashtags: "ハッシュタグ", // ハッシュタグ
                url: "//url" // URL
              }
            );

            let btn = document.getElementById("tweet-area");
            btnT = btn;
            btn.style.position = "absolute";
            setGUI();
          }
          
        

        //ボタン
        const btnGroup = new THREE.Group();
        const btnGeo = new THREE.CircleGeometry( 40, 32 );
        const btnMat = new THREE.MeshStandardMaterial({color: 0xAAAAAA});
        const btnPos = [[-230, 0], [-300, 70], [-370, 0], [-300, -70], [230, 60], [330, 60], [280, -60]];
        for (let i=0; i<btnPos.length; i++)
        {
            const btnObj = new THREE.Mesh(btnGeo, btnMat);
            btnObj.position.set(btnPos[i][0],btnPos[i][1],1);
            btnGroup.add(btnObj);
        }
        
        const resetBtn = new THREE.Mesh(new THREE.PlaneGeometry( 120, 60 ), btnMat);;
        resetBtn.position.set(0, -250, 1);
        btnGroup.add(resetBtn);
        scene.add(btnGroup);
        var textR = document.createElement('div');
            textR.style.position = 'absolute';
            //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
            textR.style.width = 100;
            textR.style.height = 100;
            //text2.style.backgroundColor = "blue";
            textR.innerHTML = "RESET";
            textR.style.userSelect = "none";
            textR.style.pointerEvents = "none";
            textR.style.color = "black";
            document.body.appendChild(textR);
        function setGUI()
        {
            if (textC != null)
            {
                textC.style.top = (height * 0.15) + 'px';
                textC.style.left = (width * 0.5 - height * 0.3) + 'px';
                textC.style.fontSize = (height / 12) + "px";
            }
            if (btnT != null)
            {
                btnT.style.left = (width * 0.5 - 23) + "px";
                btnT.style.top = (height * 0.28) + "px";
            }
            textR.style.top = (height * 0.785) + 'px';
            textR.style.left = (width * 0.5 - height * 0.05) + 'px';
            textR.style.fontSize = (height * 0.04) + "px";
        }
        setGUI();
            

      const dice = new THREE.Group(); 
      // 箱を作成
        const boxgeometry = new THREE.BoxGeometry(400, 400, 400);
        const boxMaterial = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            opacity: 0,
            transparent: true,
            });
        const box = new THREE.Mesh(boxgeometry, boxMaterial);
        dice.add(box);
      
      let dots = new Array(6);
      for (let i=0; i<6; i++) dots[i] = new Array(9);

        const geometry = new THREE.CircleGeometry( 30, 32 );
        const blackMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
        const redMaterial = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
      for (let i=0; i<9; i++)
      {
        const circle = new THREE.Mesh( geometry, blackMaterial );
        circle.position.set(-100 + 100 * (Math.floor(i/3)),-100 + 100 * (i % 3), 205);
        dice.add( circle ); 
        dots[0][i] = circle;
      }
      for (let i=0; i<9; i++)
      {
        const circle = new THREE.Mesh( geometry, blackMaterial );
        circle.position.set(205, -100 + 100 * (Math.floor(i/3)),-100 + 100 * (i % 3));
        circle.rotation.set(0,theta,0);
        dice.add( circle ); 
        dots[1][i] = circle;
      }
      for (let i=0; i<9; i++)
      {
        const circle = new THREE.Mesh( geometry, blackMaterial );
        circle.position.set(-100 + 100 * (i % 3), 205, -100 + 100 * (Math.floor(i/3)));
        circle.rotation.set(-theta,0,0);
        dice.add( circle ); 
        dots[2][i] = circle;
      }
      for (let i=0; i<9; i++)
      {
        const circle = new THREE.Mesh( geometry, blackMaterial );
        circle.position.set(-100 + 100 * (i % 3), -205, -100 + 100 * (Math.floor(i/3)));
        circle.rotation.set(theta,0,0);
        dice.add( circle ); 
        dots[3][i] = circle;
      }
      for (let i=0; i<9; i++)
      {
        const circle = new THREE.Mesh( geometry, blackMaterial );
        circle.position.set(-205, -100 + 100 * (Math.floor(i/3)),-100 + 100 * (i % 3));
        circle.rotation.set(0,-theta,0);
        dice.add( circle ); 
        dots[4][i] = circle;
      }
      for (let i=0; i<9; i++)
      {
        const circle = new THREE.Mesh( geometry, blackMaterial );
        circle.position.set(-100 + 100 * (Math.floor(i/3)),-100 + 100 * (i % 3), -205);
        circle.rotation.set(0,theta * 2,0);
        dice.add( circle ); 
        dots[5][i] = circle;
      }

      let dotParam = [
        [1,0,1,0,0,0,0,0,1.5],
        [1,0,0,1,1,0,1,0,0],
        [1.5,0,0,0,1,0,1,0,0],
        [0,0,1,0,0,0,0,0,1.5],
        [0,0,1,0,0,1,0,0,1],
        [1,0,0,0,1,0,1,0,0]
    ];

    const dotAns = [
        [0,0,0,0,1,0,0,0,0],
        [1,0,0,0,0,0,0,0,1],
        [1,0,0,0,1,0,0,0,1],
        [1,0,1,0,0,0,1,0,1],
        [1,0,1,0,1,0,1,0,1],
        [1,0,1,1,0,1,1,0,1]
    ];

    function setDotScale()
    {
        for (let i=0; i<9; i++)
        {
            for (let j=0; j<6; j++)
            {
                let s = dotParam[j][i];
                dots[j][i].scale.set(s, s, 1);
            }  
        }
    }

    setDotScale();

      dice.scale.set(0.5,0.5,0.5);
      scene.add(dice);

      const light = new THREE.AmbientLight(0xFFFFFF, 0.9);
        // シーンに追加
        scene.add(light);

        const dirLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        scene.add(dirLight);

        
        let visibleDots = new Array(9);
        let dotInv = new Array(9);
        let faceInv = 0;
        function setVisibleDots()
        {
            for (let i=0; i<6; i++)
            {
                if (dots[i][0].getWorldPosition(new THREE.Vector3()).z < 100) continue;
                faceInv = i;
                for (let j=0; j<9; j++)
                {
                    let pos = new THREE.Vector3();
                    let id = 0;
                    dots[i][j].getWorldPosition(pos);
                    if (pos.x > -20) id++;
                    if (pos.x > 20) id++;
                    if (pos.y < 20) id+=3;
                    if (pos.y < -20) id+=3;
                    visibleDots[id] = dots[i][j]; 
                    dotInv[id] = j;
                }
            }
        }
        setVisibleDots();

        let redId = 0;
        let lastRedDot = visibleDots[0];
        function setRed()
        {
            lastRedDot.material = blackMaterial;
            
            for (let i=0; i<9; i++)
            {
                let id = (redId+i) % 9;
                if (visibleDots[id].scale.x < 0.1) continue;
                visibleDots[id].material = redMaterial;
                redId = id;
                lastRedDot = visibleDots[id];
                break;
            }
        }
        setRed();

        function moveRed(b)
        {
            if (b)
            {
                redId++;
                if (redId == 9) redId = 0;
            }
            else
            {
                for (let i=1; i<9; i++)
                {
                    let id = (redId - i + 9) % 9;
                    if (visibleDots[id].scale.x < 0.1) continue;
                    visibleDots[id].material = redMaterial;
                    redId = id;
                    break;
                }
            }
        }

        function applyRed()
        {
            let s = visibleDots[redId].scale.x;
            let obj = dots[5 - faceInv][dotInv[redId]];

            if (s > 1.1) s = 1;
            else s = 0;
            visibleDots[redId].scale.set(s, s, 1);
            if (s == 0) setRed();

            s = obj.scale.x;
            if (s < 0.9) s = 1;
            else s = 1.5;
            obj.scale.set(s, s, 1);
        }

        function checkAns()
        {
            let check = [0,0,0,0,0,0];
            for (let i=0; i<6; i++)
            {
                for (let k=0; k<6; k++)
                {
                    let flag = false;
                    if (flag) break;
                    if (check[k] == 1) continue;
                    for (let j=0; j<9; j++)
                    {
                        if (dots[i][j].scale.x != dotAns[k][j]) break;
                        if (j == 8)
                        {
                            check[k] = 1;
                            flag = true;
                            if (k == 0 && faceInv != i)
                            {
                                return;
                            }
                        }
                    }
                }
            }
            for (let i=0; i<6; i++)
            {
                if (check[i] == 0) break;
                if (i == 5) 
                {
                    cleared = true;
                    window.setTimeout(function () {setTweetButton(); setInterval(animateDice, 50);}, 200);
                }
            }
        }

        function animateDice()
        {
            boxMaterial.opacity = Math.min(1, boxMaterial.opacity + 0.05);
            dice.rotateOnWorldAxis(new THREE.Vector3(0.7, -0.7, 0), theta * 0.03);
            renderer.render(scene, camera);
        }
        

        window.addEventListener('click', function (e) {
            var btn = getClickedBtn(e);
            if (btn !== undefined) {
                if (cleared) return;
                
                if(btn.object == btnGroup.children[0])
                {
                    dice.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), theta);
                    redId = 0;
                }
                else if (btn.object == btnGroup.children[1])
                {
                    dice.rotateOnWorldAxis(new THREE.Vector3(-1, 0, 0), theta);
                    redId = 0;
                }
                else if (btn.object == btnGroup.children[2])
                {
                    dice.rotateOnWorldAxis(new THREE.Vector3(0, -1, 0), theta);
                    redId = 0;
                }
                else if (btn.object == btnGroup.children[3])
                {
                    dice.rotateOnWorldAxis(new THREE.Vector3(1, 0, 0), theta);
                    redId = 0;
                }
                else if (btn.object == btnGroup.children[4])
                {
                    moveRed(false);
                }
                else if (btn.object == btnGroup.children[5])
                {
                    moveRed(true);
                }
                else if (btn.object == btnGroup.children[6])
                {
                    applyRed();
                }
                else if (btn.object == btnGroup.children[7])
                {
                    setDotScale();
                    dice.rotation.set(0,0,0);
                    redId = 0;
                }
                setVisibleDots();
                setRed();
                checkAns();
                renderer.render(scene, camera);
            }
        }, false);
    
        var raycaster = new THREE.Raycaster();
        function getClickedBtn(e) {
            var raymouse = new THREE.Vector2();
        
            raymouse.x = (e.offsetX / width) * 2 - 1;
            raymouse.y = -(e.offsetY / height) * 2 + 1;
            raycaster.setFromCamera(raymouse, camera);
            var intersects = raycaster.intersectObjects(btnGroup.children);
        
            if (intersects.length > 0) {
                var btn = intersects[0];
            }
        
            return btn;
        }

        window.onresize = function() {
            width = window.innerWidth;
            height = window.innerHeight;
            camera = new THREE.PerspectiveCamera(45, width / height);
            camera.position.set(0, 0, +1000);
            renderer.setSize(width, height);
            renderer.render(scene,camera);
            setGUI();
          };
        
        renderer.render(scene, camera);
    }    

            


            function reset_click()
            {
                document.getElementById("reset_btn").setAttribute("fill", "#AAAAAA");
                resetDate();
                drawLine();
            }

            function release_btn()
            {
                for (let i=0; i<=3; i++)
                {
                    document.getElementById("btn" + i).setAttribute("fill", "#DDDDDD");
                }
                document.getElementById("reset_btn").setAttribute("fill", "#DDDDDD");
            }

            function tweet()
            {
                var EUC = encodeURIComponent;
                var twitter_url = "http://twitter.com/intent/tweet?text=";
                var URL = location.href;
                //var connection = 0;
                var message = "web謎解き spiky の謎を解き明かした！";

                //あらかじめ設定されたツイート内容と現在いるページのURLを取得してツイートします。
                message += URL + "\n\n#web謎解き #とと謎spiky";

                if (navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
                    location.href = 'https://twitter.com/intent/tweet?text=' + EUC(message);
                }else{
                    window.open(twitter_url + EUC(message), "_blank","top=50,left=50,width=500,height=500,scrollbars=1,location=0,menubar=0,toolbar=0,status=1,directories=0,resizable=1");
                }
            }

            function clk_q()
            {
                var inst = document.getElementById("instruction");
                if(inst.getAttribute("display") == "none") inst.setAttribute("display", "inline");
                else close_inst();
            }

            function close_inst()
            {
                document.getElementById("instruction").setAttribute("display", "none");
            }