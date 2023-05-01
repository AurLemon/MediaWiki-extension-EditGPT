( function ( mw, $, OO ) {
    var EditGPT = {
        init: function () {
            if ($('#EditGPTWidget').length) {
                this.addEventListeners();
            }
        },
        addEventListeners: function () {
            var htmlText = 
            '<div id="EditGPTToolbar">' +
            '<img id="logo" src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0nNDEnIGhlaWdodD0nNDEnIHZpZXdCb3g9JzAgMCA0MSA0MScgZmlsbD0nbm9uZScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMzcuNTMyNCAxNi44NzA3QzM3Ljk4MDggMTUuNTI0MSAzOC4xMzYzIDE0LjA5NzQgMzcuOTg4NiAxMi42ODU5QzM3Ljg0MDkgMTEuMjc0NCAzNy4zOTM0IDkuOTEwNzYgMzYuNjc2IDguNjg2MjJDMzUuNjEyNiA2LjgzNDA0IDMzLjk4ODIgNS4zNjc2IDMyLjAzNzMgNC40OTg1QzMwLjA4NjQgMy42Mjk0MSAyNy45MDk4IDMuNDAyNTkgMjUuODIxNSAzLjg1MDc4QzI0Ljg3OTYgMi43ODkzIDIzLjcyMTkgMS45NDEyNSAyMi40MjU3IDEuMzYzNDFDMjEuMTI5NSAwLjc4NTU3NSAxOS43MjQ5IDAuNDkxMjY5IDE4LjMwNTggMC41MDAxOTdDMTYuMTcwOCAwLjQ5NTA0NCAxNC4wODkzIDEuMTY4MDMgMTIuMzYxNCAyLjQyMjE0QzEwLjYzMzUgMy42NzYyNCA5LjM0ODUzIDUuNDQ2NjYgOC42OTE3IDcuNDc4MTVDNy4zMDA4NSA3Ljc2Mjg2IDUuOTg2ODYgOC4zNDE0IDQuODM3NyA5LjE3NTA1QzMuNjg4NTQgMTAuMDA4NyAyLjczMDczIDExLjA3ODIgMi4wMjgzOSAxMi4zMTJDMC45NTY0NjQgMTQuMTU5MSAwLjQ5ODkwNSAxNi4yOTg4IDAuNzIxNjk4IDE4LjQyMjhDMC45NDQ0OTIgMjAuNTQ2NyAxLjgzNjEyIDIyLjU0NDkgMy4yNjggMjQuMTI5M0MyLjgxOTY2IDI1LjQ3NTkgMi42NjQxMyAyNi45MDI2IDIuODExODIgMjguMzE0MUMyLjk1OTUxIDI5LjcyNTYgMy40MDcwMSAzMS4wODkyIDQuMTI0MzcgMzIuMzEzOEM1LjE4NzkxIDM0LjE2NTkgNi44MTIzIDM1LjYzMjIgOC43NjMyMSAzNi41MDEzQzEwLjcxNDEgMzcuMzcwNCAxMi44OTA3IDM3LjU5NzMgMTQuOTc4OSAzNy4xNDkyQzE1LjkyMDggMzguMjEwNyAxNy4wNzg2IDM5LjA1ODcgMTguMzc0NyAzOS42MzY2QzE5LjY3MDkgNDAuMjE0NCAyMS4wNzU1IDQwLjUwODcgMjIuNDk0NiA0MC40OTk4QzI0LjYzMDcgNDAuNTA1NCAyNi43MTMzIDM5LjgzMjEgMjguNDQxOCAzOC41NzcyQzMwLjE3MDQgMzcuMzIyMyAzMS40NTU2IDM1LjU1MDYgMzIuMTExOSAzMy41MTc5QzMzLjUwMjcgMzMuMjMzMiAzNC44MTY3IDMyLjY1NDcgMzUuOTY1OSAzMS44MjFDMzcuMTE1IDMwLjk4NzQgMzguMDcyOCAyOS45MTc4IDM4Ljc3NTIgMjguNjg0QzM5Ljg0NTggMjYuODM3MSA0MC4zMDIzIDI0LjY5NzkgNDAuMDc4OSAyMi41NzQ4QzM5Ljg1NTYgMjAuNDUxNyAzOC45NjM5IDE4LjQ1NDQgMzcuNTMyNCAxNi44NzA3Wk0yMi40OTc4IDM3Ljg4NDlDMjAuNzQ0MyAzNy44ODc0IDE5LjA0NTkgMzcuMjczMyAxNy42OTk0IDM2LjE1MDFDMTcuNzYwMSAzNi4xMTcgMTcuODY2NiAzNi4wNTg2IDE3LjkzNiAzNi4wMTYxTDI1LjkwMDQgMzEuNDE1NkMyNi4xMDAzIDMxLjMwMTkgMjYuMjY2MyAzMS4xMzcgMjYuMzgxMyAzMC45Mzc4QzI2LjQ5NjQgMzAuNzM4NiAyNi41NTYzIDMwLjUxMjQgMjYuNTU0OSAzMC4yODI1VjE5LjA1NDJMMjkuOTIxMyAyMC45OThDMjkuOTM4OSAyMS4wMDY4IDI5Ljk1NDEgMjEuMDE5OCAyOS45NjU2IDIxLjAzNTlDMjkuOTc3IDIxLjA1MiAyOS45ODQyIDIxLjA3MDcgMjkuOTg2NyAyMS4wOTAyVjMwLjM4ODlDMjkuOTg0MiAzMi4zNzUgMjkuMTk0NiAzNC4yNzkxIDI3Ljc5MDkgMzUuNjg0MUMyNi4zODcyIDM3LjA4OTIgMjQuNDgzOCAzNy44ODA2IDIyLjQ5NzggMzcuODg0OVpNNi4zOTIyNyAzMS4wMDY0QzUuNTEzOTcgMjkuNDg4OCA1LjE5NzQyIDI3LjcxMDcgNS40OTgwNCAyNS45ODMyQzUuNTU3MTggMjYuMDE4NyA1LjY2MDQ4IDI2LjA4MTggNS43MzQ2MSAyNi4xMjQ0TDEzLjY5OSAzMC43MjQ4QzEzLjg5NzUgMzAuODQwOCAxNC4xMjMzIDMwLjkwMiAxNC4zNTMyIDMwLjkwMkMxNC41ODMgMzAuOTAyIDE0LjgwODggMzAuODQwOCAxNS4wMDczIDMwLjcyNDhMMjQuNzMxIDI1LjExMDNWMjguOTk3OUMyNC43MzIxIDI5LjAxNzcgMjQuNzI4MyAyOS4wMzc2IDI0LjcxOTkgMjkuMDU1NkMyNC43MTE1IDI5LjA3MzYgMjQuNjk4OCAyOS4wODkzIDI0LjY4MjkgMjkuMTAxMkwxNi42MzE3IDMzLjc0OTdDMTQuOTA5NiAzNC43NDE2IDEyLjg2NDMgMzUuMDA5NyAxMC45NDQ3IDM0LjQ5NTRDOS4wMjUwNiAzMy45ODExIDcuMzg3ODUgMzIuNzI2MyA2LjM5MjI3IDMxLjAwNjRaTTQuMjk3MDcgMTMuNjE5NEM1LjE3MTU2IDEyLjA5OTggNi41NTI3OSAxMC45MzY0IDguMTk4ODUgMTAuMzMyN0M4LjE5ODg1IDEwLjQwMTMgOC4xOTQ5MSAxMC41MjI4IDguMTk0OTEgMTAuNjA3MVYxOS44MDhDOC4xOTM1MSAyMC4wMzc4IDguMjUzMzQgMjAuMjYzOCA4LjM2ODIzIDIwLjQ2MjlDOC40ODMxMiAyMC42NjE5IDguNjQ4OTMgMjAuODI2NyA4Ljg0ODYzIDIwLjk0MDRMMTguNTcyMyAyNi41NTQyTDE1LjIwNiAyOC40OTc5QzE1LjE4OTQgMjguNTA4OSAxNS4xNzAzIDI4LjUxNTUgMTUuMTUwNSAyOC41MTczQzE1LjEzMDcgMjguNTE5MSAxNS4xMTA3IDI4LjUxNiAxNS4wOTI0IDI4LjUwODJMNy4wNDA0NiAyMy44NTU3QzUuMzIxMzUgMjIuODYwMSA0LjA2NzE2IDIxLjIyMzUgMy41NTI4OSAxOS4zMDQ2QzMuMDM4NjIgMTcuMzg1OCAzLjMwNjI0IDE1LjM0MTMgNC4yOTcwNyAxMy42MTk0Wk0zMS45NTUgMjAuMDU1NkwyMi4yMzEyIDE0LjQ0MTFMMjUuNTk3NiAxMi40OTgxQzI1LjYxNDIgMTIuNDg3MiAyNS42MzMzIDEyLjQ4MDUgMjUuNjUzMSAxMi40Nzg3QzI1LjY3MjkgMTIuNDc2OSAyNS42OTI4IDEyLjQ4MDEgMjUuNzExMSAxMi40ODc5TDMzLjc2MzEgMTcuMTM2NEMzNC45OTY3IDE3Ljg0OSAzNi4wMDE3IDE4Ljg5ODIgMzYuNjYwNiAyMC4xNjEzQzM3LjMxOTQgMjEuNDI0NCAzNy42MDQ3IDIyLjg0OSAzNy40ODMyIDI0LjI2ODRDMzcuMzYxNyAyNS42ODc4IDM2LjgzODIgMjcuMDQzMiAzNS45NzQzIDI4LjE3NTlDMzUuMTEwMyAyOS4zMDg2IDMzLjk0MTUgMzAuMTcxNyAzMi42MDQ3IDMwLjY2NDFDMzIuNjA0NyAzMC41OTQ3IDMyLjYwNDcgMzAuNDczMyAzMi42MDQ3IDMwLjM4ODlWMjEuMTg4QzMyLjYwNjYgMjAuOTU4NiAzMi41NDc0IDIwLjczMjggMzIuNDMzMiAyMC41MzM4QzMyLjMxOSAyMC4zMzQ4IDMyLjE1NCAyMC4xNjk4IDMxLjk1NSAyMC4wNTU2Wk0zNS4zMDU1IDE1LjAxMjhDMzUuMjQ2NCAxNC45NzY1IDM1LjE0MzEgMTQuOTE0MiAzNS4wNjkgMTQuODcxN0wyNy4xMDQ1IDEwLjI3MTJDMjYuOTA2IDEwLjE1NTQgMjYuNjgwMyAxMC4wOTQzIDI2LjQ1MDQgMTAuMDk0M0MyNi4yMjA2IDEwLjA5NDMgMjUuOTk0OCAxMC4xNTU0IDI1Ljc5NjMgMTAuMjcxMkwxNi4wNzI2IDE1Ljg4NThWMTEuOTk4MkMxNi4wNzE1IDExLjk3ODMgMTYuMDc1MyAxMS45NTg1IDE2LjA4MzcgMTEuOTQwNUMxNi4wOTIxIDExLjkyMjUgMTYuMTA0OCAxMS45MDY4IDE2LjEyMDcgMTEuODk0OUwyNC4xNzE5IDcuMjUwMjVDMjUuNDA1MyA2LjUzOTAzIDI2LjgxNTggNi4xOTM3NiAyOC4yMzgzIDYuMjU0ODJDMjkuNjYwOCA2LjMxNTg5IDMxLjAzNjQgNi43ODA3NyAzMi4yMDQ0IDcuNTk1MDhDMzMuMzcyMyA4LjQwOTM5IDM0LjI4NDIgOS41Mzk0NSAzNC44MzM0IDEwLjg1MzFDMzUuMzgyNiAxMi4xNjY3IDM1LjU0NjQgMTMuNjA5NSAzNS4zMDU1IDE1LjAxMjhaTTE0LjI0MjQgMjEuOTQxOUwxMC44NzUyIDE5Ljk5ODFDMTAuODU3NiAxOS45ODkzIDEwLjg0MjMgMTkuOTc2MyAxMC44MzA5IDE5Ljk2MDJDMTAuODE5NSAxOS45NDQxIDEwLjgxMjIgMTkuOTI1NCAxMC44MDk4IDE5LjkwNThWMTAuNjA3MUMxMC44MTA3IDkuMTgyOTUgMTEuMjE3MyA3Ljc4ODQ4IDExLjk4MTkgNi41ODY5NkMxMi43NDY2IDUuMzg1NDQgMTMuODM3NyA0LjQyNjU5IDE1LjEyNzUgMy44MjI2NEMxNi40MTczIDMuMjE4NjkgMTcuODUyNCAyLjk5NDY0IDE5LjI2NDkgMy4xNzY3QzIwLjY3NzUgMy4zNTg3NiAyMi4wMDg5IDMuOTM5NDEgMjMuMTAzNCA0Ljg1MDY3QzIzLjA0MjcgNC44ODM3OSAyMi45MzcgNC45NDIxNSAyMi44NjY4IDQuOTg0NzNMMTQuOTAyNCA5LjU4NTE3QzE0LjcwMjUgOS42OTg3OCAxNC41MzY2IDkuODYzNTYgMTQuNDIxNSAxMC4wNjI2QzE0LjMwNjUgMTAuMjYxNiAxNC4yNDY2IDEwLjQ4NzcgMTQuMjQ3OSAxMC43MTc1TDE0LjI0MjQgMjEuOTQxOVpNMTYuMDcxIDE3Ljk5OTFMMjAuNDAxOCAxNS40OTc4TDI0LjczMjUgMTcuOTk3NVYyMi45OTg1TDIwLjQwMTggMjUuNDk4M0wxNi4wNzEgMjIuOTk4NVYxNy45OTkxWicgZmlsbD0nY3VycmVudENvbG9yJz48L3BhdGg+PC9zdmc+" />' +
            '<div id="title">' +
            mw.message('editgpt-title').plain() +
            '</div><div id="button">' +
            '<button id="EditGPTButton">' +
            mw.message('editgpt-button-label').plain() +
            '</button><button id="EditGPTCopy">' +
            mw.message('editgpt-button-copy').plain() +
            '</button><div id="history-container"></div><select id="speech">' +
            '</select></div></div>' +
            '<div id="input"><div id="type-name">'+ mw.message('editgpt-input').plain() +'</div><textarea id="EditGPTInput"></textarea></div>' +
            '<div id="output"><div id="type-name">'+ mw.message('editgpt-output').plain() +'</div><div id="EditGPTOutput"></div></div>' +
            // '<div id="history"><div id="title">' + mw.message('editgpt-history').plain() + '</div><div id="his-div"></div>' +
            '<div id="Console"><img id="logo" src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGhlaWdodD0nNDgnIHZpZXdCb3g9JzAgOTYgOTYwIDk2MCcgd2lkdGg9JzQ4Jz48cGF0aCBkPSdNMTQwIDg5NnEtMjQgMC00Mi0xOHQtMTgtNDJWMzE2cTAtMjQgMTgtNDJ0NDItMThoNjgwcTI0IDAgNDIgMTh0MTggNDJ2NTIwcTAgMjQtMTggNDJ0LTQyIDE4SDE0MFptMC02MGg2ODBWNDAwSDE0MHY0MzZabTE2MC03Mi00Mi00MiAxMDMtMTA0LTEwNC0xMDQgNDMtNDIgMTQ2IDE0Ni0xNDYgMTQ2Wm0xOTAgNHYtNjBoMjIwdjYwSDQ5MFonLz48L3N2Zz4=" />' +
            '<img id="error-img" src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGhlaWdodD0nNDgnIHZpZXdCb3g9JzAgOTYgOTYwIDk2MCcgd2lkdGg9JzQ4Jz48cGF0aCBkPSdtMjQ5IDg0OS00Mi00MiAyMzEtMjMxLTIzMS0yMzEgNDItNDIgMjMxIDIzMSAyMzEtMjMxIDQyIDQyLTIzMSAyMzEgMjMxIDIzMS00MiA0Mi0yMzEtMjMxLTIzMSAyMzFaJy8+PC9zdmc+" />' +
            '<div id="loader" style="display: none;"><div></div><div></div><div></div><div></div><div></div></div>' +
            '<div id="Console-info">' +
            mw.message('editgpt-welcome-info').plain() +
            '</div>' +
            '</div>' +
            // '<aside id="history"><div id="title"></div><div id="his-div"></aside>' +
            '</div>';

            var self = this;

            /* 按钮点击事件 */
            $('#EditGPTWidget').html(htmlText);
            $('#EditGPTButton').on('click', function (e) {
                e.preventDefault();
                self.getEditedText();
                document.getElementById('error-img').style.display = 'none';
            });
            $('#EditGPTCopy').on('click', function (e) {
                function copyElementContentToClipboard(selector) {
                    var element = document.querySelector(selector);
                    if (element) {
                      var content = element.innerHTML;
                      var tempInput = document.createElement("input");
                      tempInput.value = content;
                      document.body.appendChild(tempInput);
                      tempInput.select();
                      document.execCommand("copy");
                      document.body.removeChild(tempInput);
                    }
                  }
                  copyElementContentToClipboard("#EditGPTOutput");
                  mw.notify(mw.message('editgpt-copy-success').plain());
            });

            /* 预设话术 HTML */
            var speechElement = document.getElementById('speech');
            var speech = mw.config.get('EditGPTSpeech');
            var speechSelectHTML = '<option selected>' + mw.message('editgpt-speech-customize').plain() + '</option>';
            $.each(speech, function(index, value) {
              speechSelectHTML += '<option>' + value['name'] + '</option>';
            });
            speechElement.innerHTML = speechSelectHTML;

            /* 历史记录 HTML */
            var historyButtonHTML = document.getElementById('history-container');
            historyButtonHTML.innerHTML = 
            '<label id="historyLabel" for="historyButton" title="查看历史"><span>历史记录</span></label>' +
            '<input id="historyButton" type="checkbox">' +
            '<aside id="historyMenu" class="menu">' +
                '<div class="menu-content">' +
                '</div>' +
            '</aside>';

            /* historyButton 点击事件 */
            var checkbox = document.getElementById('historyButton');
            checkbox.addEventListener('click', function(event) {
                event.stopPropagation();
            });
            function handleBlankClick(event) {
                var historyContainer = document.getElementById('history-container');
                var historyMenu = document.getElementById('historyMenu');
                if (!historyContainer.contains(event.target) && !historyMenu.contains(event.target)) {
                    checkbox.checked = false;
                }
            }
            document.addEventListener('click', handleBlankClick);
        },

        getEditedText: function () {
            var inputText = $('#EditGPTInput').val();
            if (inputText !== '') {
                document.getElementById('loader').style.display = 'flex';
                var buttonOutput = $('#Console-info');

                var speechSelect = document.getElementById("speech");
                var selectedSpeechIndex = speechSelect.selectedIndex;

                if (selectedSpeechIndex == 0) {
                    speechSelectedOption = mw.message('editgpt-speech-customize').plain();
                } else {
                    var speech = mw.config.get('EditGPTSpeech');
                    speechSelectedOption = speech[selectedSpeechIndex - 1]['name'];
                }

                var speech = mw.config.get('EditGPTSpeech');
                buttonOutput.html(mw.message('editgpt-speech-selected').plain() + ': ' + speechSelectedOption + mw.message('editgpt-completion-period').plain() + mw.message('editgpt-request-sending').plain());

                $.ajax({
                url: mw.util.wikiScript('api'),
                type: 'POST',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Api-User-Agent', 'EditGPT/1.0');
                },
                data: {
                    action: 'editgptrequest',
                    format: 'json',
                    inputText: inputText,
                    Token: mw.config.get('EditGPTSecurityToken'),
                    Speech: selectedSpeechIndex
                },
                dataType: 'json'
                }).done(function(response) {
                    document.getElementById('loader').style.display = 'none';
                    if ('editgptrequest' in response) {
                        /* 解析并赋值 */
                        var editedText = JSON.parse(response.editgptrequest).choices[0].message.content;
                        var createdTime = JSON.parse(response.editgptrequest).created;
                        var modelType = JSON.parse(response.editgptrequest).model;
                        var totalTokens = JSON.parse(response.editgptrequest).usage.total_tokens;
    
                        /* 输出信息 */
                        var output = $('#EditGPTOutput');
                        output.html(editedText);
    
                        /* 流模式动画 */
                        // var editedTextArray = editedText.split('');
                        // var i = 0;
                        // var output = $('#EditGPTOutput');
                        // output.html('');
                        // var timer = setInterval(function () {
                        //     if (i < editedTextArray.length) {
                        //         output.append(editedTextArray[i]);
                        //         i++;
                        //     } else {
                        //         clearInterval(timer);
                        //     }
                        // }, 50);

                        /* 终端区域输出信息 */
                        var consoleOutputSplit = mw.message('editgpt-completion-comma').plain();
                        var consoleOutput = $('#Console-info');
                        consoleOutput.html(mw.message('editgpt-completion-created').plain() + ': ' + createdTime + consoleOutputSplit + mw.message('editgpt-completion-totaltoken').plain() + ': ' + totalTokens + consoleOutputSplit + mw.message('editgpt-completion-model').plain() + ': ' + modelType + mw.message('editgpt-completion-period').plain());

                        /* 存入历史记录的函数 */
                        function historyStorage(prompt, completion) {
                            var content = $('#historyMenu .menu-content');
                            contentHTML = 
                            '<div id="HisDiv">' +
                                '<div id="Prompt"><img id="user" src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGhlaWdodD0nNDgnIHZpZXdCb3g9JzAgOTYgOTYwIDk2MCcgd2lkdGg9JzQ4Jz48cGF0aCBkPSdNNDgwIDU3NXEtNjYgMC0xMDgtNDJ0LTQyLTEwOHEwLTY2IDQyLTEwOHQxMDgtNDJxNjYgMCAxMDggNDJ0NDIgMTA4cTAgNjYtNDIgMTA4dC0xMDggNDJaTTE2MCA4OTZ2LTk0cTAtMzggMTktNjV0NDktNDFxNjctMzAgMTI4LjUtNDVUNDgwIDYzNnE2MiAwIDEyMyAxNS41dDEyNy45MjEgNDQuNjk0cTMxLjMwMSAxNC4xMjYgNTAuMTkgNDAuOTY2UTgwMCA3NjQgODAwIDgwMnY5NEgxNjBabTYwLTYwaDUyMHYtMzRxMC0xNi05LjUtMzAuNVQ3MDcgNzUwcS02NC0zMS0xMTctNDIuNVQ0ODAgNjk2cS01NyAwLTExMSAxMS41VDI1MiA3NTBxLTE0IDctMjMgMjEuNXQtOSAzMC41djM0Wm0yNjAtMzIxcTM5IDAgNjQuNS0yNS41VDU3MCA0MjVxMC0zOS0yNS41LTY0LjVUNDgwIDMzNXEtMzkgMC02NC41IDI1LjVUMzkwIDQyNXEwIDM5IDI1LjUgNjQuNVQ0ODAgNTE1Wm0wLTkwWm0wIDQxMVonLz48L3N2Zz4=" />' +
                                prompt +
                                '</div>' +
                                '<div id="Completion">' +
                                completion +
                                '</div>' +
                            '</div>';
                            content.append(contentHTML);
                        }

                        /* 将内容存入历史记录区 */
                        var input = document.getElementById('EditGPTInput');
                        var input = input.value;
                        var output = document.getElementById('EditGPTOutput');
                        var output = output.innerHTML;
                        historyStorage(input, output);

                    } else if ('error' in response) {
                        document.getElementById('error-img').style.display = 'block';
                        var consoleOutput = $('#Console-info');
                        consoleOutput.html(response.error.info);
                    }
                }).fail(function(xhr, textStatus, errorThrown) {
                    document.getElementById('loader').style.display = 'none';
                    document.getElementById('error-img').style.display = 'block';
                    var consoleOutput = $('#Console-info');
                    consoleOutput.html(mw.message('editgpt-request-failed').plain());
                });   
            } else {
                document.getElementById('loader').style.display = 'none';
                var output = $('#Console-info');
                output.html(mw.message('editgpt-request-empty').plain());
            }
        }        
    };
    $(document).ready(function () {
        EditGPT.init();
    });
})( mediaWiki, jQuery, OO );
