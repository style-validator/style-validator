javascript:"use strict";var STYLEV=STYLEV||{};STYLEV.isChrome=navigator.userAgent.toLowerCase().indexOf("chrome")>-1&&navigator.userAgent.toLowerCase().indexOf("opr")<0,STYLEV.isChromeExtension=function(){try{return chrome.runtime.onMessage.addListener(function(){}),!0}catch(e){return!1}}(),STYLEV.isBookmarklet=STYLEV.isChrome?!STYLEV.isChromeExtension:!0,STYLEV.isReLoaded=void 0!==STYLEV.VALIDATOR,STYLEV.isLoaded=!STYLEV.isReLoaded,STYLEV.isFirstExecution=!0,STYLEV.isValidated=!1,STYLEV.options={ENABLE_MUTATION_OBSERVER:!0,ENABLE_AUTO_EXECUTION:!1,ENABLE_ANIMATION:!1,TARGET_SELECTOR:!1,TARGET_SELECTOR_TEXT:"",NOT_TARGET_SELECTOR:!1,NOT_TARGET_SELECTOR_TEXT:""},STYLEV.affectedElemsStylevId=STYLEV.affectedElemsStylevId||[],STYLEV.ignoreElemsStylevId=STYLEV.ignoreElemsStylevId||[],STYLEV.sameElemCount=STYLEV.sameElemCount||0,STYLEV.consoleWrapperHeight=STYLEV.consoleWrapperHeight||0,STYLEV.consoleScrollTop=STYLEV.consoleScrollTop||0,STYLEV.selectedLineInConsole=STYLEV.selectedLineInConsole||null,STYLEV.VALIDATOR={execute:function(e){var t=STYLEV.VALIDATOR;return STYLEV.isFirstExecution?(t.setParameters(),Promise.all([t.getDataFromURL(t.settings.RULES_PATH).then(JSON.parse),t.getDataFromURL(t.settings.TAGS_ALL_PATH).then(JSON.parse),t.getDataFromURL(t.settings.EMPTY_TAGS_PATH).then(JSON.parse),t.getDataFromURL(t.settings.TAGS_REPLACED_ELEMENT_PATH).then(JSON.parse),t.getDataFromURL(t.settings.TAGS_TABLE_CHILDREN_PATH).then(JSON.parse)]).then(function(o){t.rulesData=o[0],t.tagsAllData=o[1],t.tagsEmptyData=o[2],t.tagsReplacedElementData=o[3],t.tagsTableChildren=o[4],t.regexAllHTMLTag=new RegExp(" "+t.tagsAllData.join(" | ")+" "),t.regexEmptyElem=new RegExp("^( "+t.tagsEmptyData.join(" | ")+" )"),t.regexReplacedElem=new RegExp("^( "+t.tagsReplacedElementData.join(" | ")+" )"),t.regexTableChildElem=new RegExp("^( "+t.tagsTableChildren.join(" | ")+" )"),t.updateOptions().then(function(){t.moManager=t.setupMutationObserver(),t.validate(e),STYLEV.isFirstExecution=!1})}),!1):(t.validate(e),!1)},setParameters:function(){var e=STYLEV.VALIDATOR;e.html=document.querySelector("html"),e.head=document.querySelector("head"),e.body=document.querySelector("body"),e.htmlDefaultBorderBottomWidth=""===e.html.style.borderBottomWidth?null:e.html.style.borderBottomWidth,e.RESOURCE_ROOT=STYLEV.CHROME_EXTENSION.RESOURCE_ROOT||"https://style-validator.github.io/",e.isObserving=!1,e.prevElemData={},e.settings={CONSOLE_WRAPPER_ID:"stylev-console-wrapper",CONSOLE_LIST_ID:"stylev-console-list",STYLESHEET_ID:"stylev-stylesheet",CONSOLE_WRAPPER_DEFAULT_HEIGHT:200,CONSOLE_HEADING_TEXT:"Style Validator",CONGRATULATION_MESSAGE_TEXT:"It's Perfect!",SERVER_RESOURCE_ROOT:"https://style-validator.github.io/Style-Validator/",STYLESHEET_PATH:e.RESOURCE_ROOT+"style-validator-for-elements.css",SPECIFICITY_PATH:e.RESOURCE_ROOT+"specificity.js",GA_PATH:e.RESOURCE_ROOT+"google-analytics.js",RULES_PATH:e.RESOURCE_ROOT+"data/rules.json",TAGS_ALL_PATH:e.RESOURCE_ROOT+"data/tags-all.json",EMPTY_TAGS_PATH:e.RESOURCE_ROOT+"data/tags-empty.json",TAGS_REPLACED_ELEMENT_PATH:e.RESOURCE_ROOT+"data/tags-replaced-element.json",TAGS_TABLE_CHILDREN_PATH:e.RESOURCE_ROOT+"data/tags-table-children.json",ICON_REFRESH_PATH:e.RESOURCE_ROOT+"iconmonstr-refresh-3-icon.svg",ICON_CLOSE_PATH:e.RESOURCE_ROOT+"iconmonstr-x-mark-icon.svg",ICON_MINIMIZE_PATH:e.RESOURCE_ROOT+"iconmonstr-minus-2-icon.svg",ICON_NORMALIZE_PATH:e.RESOURCE_ROOT+"iconmonstr-plus-2-icon.svg",ICON_CONNECTED_PATH:e.RESOURCE_ROOT+"iconmonstr-link-4-icon.svg",ICON_DISCONNECTED_PATH:e.RESOURCE_ROOT+"iconmonstr-link-5-icon.svg",ICON_LOGO_PATH:e.RESOURCE_ROOT+"style-validator.logo.black.svg",CONNECTED_2_DEVTOOLS_MESSAGE:"Connected to DevTools",DISCONNECTED_2_DEVTOOLS_MESSAGE:"Disconnected to DevTools",CONNECTED_2_DEVTOOLS_CLASS:"stylev-console-mode-devtools-connected",DISCONNECTED_2_DEVTOOLS_CLASS:"stylev-console-mode-devtools-disconnected"}},getDataFromURL:function(e){STYLEV.VALIDATOR;return new Promise(function(t,o){var n=new XMLHttpRequest;n.open("GET",e,!0),n.onload=function(){200===n.status?t(n.responseText):o(new Error(n.statusText))},n.onerror=function(){o(new Error(n.statusText))},n.send()})},insertLibs4Bookmarklet:function(){var e=STYLEV.VALIDATOR;if(STYLEV.isBookmarklet){for(var t=[e.settings.SPECIFICITY_PATH],o=document.createDocumentFragment(),n=0,s=t.length;s>n;n++){var a=t[n];e.head.querySelectorAll('script[src="'+a+'"]').length||(e.scriptTag=document.createElement("script"),e.scriptTag.src=a,e.scriptTag.classList.add("stylev-ignore"),o.appendChild(e.scriptTag))}e.head.appendChild(o)}},insertGA:function(){var e=STYLEV.VALIDATOR,t=e.head.querySelector("#stylev-ga");null!==t&&e.head.removeChild(t),e.scriptTagGA=document.createElement("script"),e.scriptTagGA.src=e.settings.GA_PATH,e.scriptTagGA.async="async",e.scriptTagGA.id="stylev-ga",e.scriptTagGA.classList.add("stylev-ignore"),e.head.appendChild(e.scriptTagGA)},updateOptions:function(){STYLEV.VALIDATOR;return new Promise(function(e,t){STYLEV.isChromeExtension?chrome.storage.sync.get("options",function(t){void 0!==t.options&&(STYLEV.options={ENABLE_MUTATION_OBSERVER:t.options.enabledMutationObserver,ENABLE_AUTO_EXECUTION:t.options.enableAutoExecution,ENABLE_ANIMATION:t.options.enableAnimation,TARGET_SELECTOR:t.options.targetSelector,TARGET_SELECTOR_TEXT:t.options.targetSelectorText?t.options.targetSelectorText.split(","):"",NOT_TARGET_SELECTOR:t.options.notTargetSelector,NOT_TARGET_SELECTOR_TEXT:t.options.notTargetSelectorText?t.options.notTargetSelectorText.split(","):""}),e()}):e()})},validate:function(e){console.info("Validator will start!");var t=STYLEV.VALIDATOR;t.initializeBeforeValidation();for(var o=0;o<t.allElemLength;o++){var n={};n.targetElem=t.allElem[o],n.targetElemTagName=n.targetElem.tagName.toLowerCase(),n.targetElemDefault=t.iframeDocument.querySelector(n.targetElemTagName);var s=t.regexAllHTMLTag.test(" "+n.targetElemTagName+" ");if(s&&"style"!==n.targetElemTagName){n.targetElemStyles=getComputedStyle(n.targetElem,""),n.targetParentElem=n.targetElem.parentElement,n.targetParentElem&&(n.targetElemParentStyles=getComputedStyle(n.targetParentElem,""),n.targetElemParentDisplayProp=n.targetElemParentStyles.getPropertyValue("display")),n.targetElemDisplayPropVal=n.targetElemStyles.getPropertyValue("display"),n.targetElemDefaultDisplayProp=t.getStyle(n.targetElemDefault,"display");for(var a=t.regexEmptyElem.test(" "+n.targetElemTagName+" "),r=(t.regexTableChildElem.test(" "+n.targetElemTagName+" "),"inline"===n.targetElemDisplayPropVal,"inline-block"===n.targetElemDisplayPropVal,t.regexReplacedElem.test(" "+n.targetElemTagName+" ")),l="html"!==n.targetElemTagName,i=0,c=t.rulesData.length;c>i;i++){var d=!0,E=t.rulesData[i],m=E["base-styles"],g=E["error-styles"],p=E["warning-styles"],u=E["parent-error-styles"],T=E["parent-warning-styles"],h=E.replaced,v=E.empty;E["pseudo-before-error-styles"],E["pseudo-before-warning-styles"],E["pseudo-after-error-styles"],E["pseudo-after-warning-styles"],E["reference-url"];if(n.isDisplayPropChanged=!1,("Replaced elements"!==h||r)&&("Non-replaced elements"!==h||!r)&&("Empty elements"!==v||a)){for(var y in m)if(m.hasOwnProperty(y)){var S=m[y],L=getComputedStyle(n.targetElem,"").getPropertyValue(y),f=S===L;if(!f){d=!1;break}}if(d){for(var O in g)g.hasOwnProperty(O)&&t.detectErrorAndWarn("error",O,g,n,a,!1,E);for(var C in p)p.hasOwnProperty(C)&&t.detectErrorAndWarn("warning",C,p,n,a,!1,E);if(l){for(var A in T)T.hasOwnProperty(A)&&t.detectErrorAndWarn("warning",A,T,n,a,!0,E);for(var _ in u)u.hasOwnProperty(_)&&t.detectErrorAndWarn("error",_,u,n,a,!0,E)}}}}t.prevElemData=n}}t.removeIframe4getDefaultStyles(),t.showConsole(),t.bind4targetElements(),"function"==typeof e&&e.bind(t)(),t.insertGA(),t.insertLibs4Bookmarklet(),console.log("Validated and Console Displayed"),t.isObserving||t.moManager.connect()},initializeBeforeValidation:function(){var e=STYLEV.VALIDATOR;e.isObserving&&e.moManager.disconnect(),e.removeConsole(),e.removeAllAttrAndEvents(),e.allElem=document.querySelectorAll("*:not(.stylev-ignore)"),e.allElemLength=e.allElem.length,e.resultArray=[],e.errorNum=0,e.warningNum=0,e.errorIndex=0,e.insertIframe4getDefaultStyles(),e.setStyleDataBySelectors(document),e.setStyleDataBySelectors(e.iframeDocument)},detectErrorAndWarn:function(e,t,o,n,s,a,r,l){var i,c=STYLEV.VALIDATOR,d={},E=o[t],m=c.getStyle(n.targetElemDefault,t,l),g=c.getStyle(n.targetElem,t,l),p=0===E.indexOf("!"),u=E.match(/^!{0,1}\[(.+)\]$/);E=u?u[1]:E.replace("!","");var T=E.split("|").length>1;if(E=T?E.split("|"):E,i=T?new RegExp(" "+E.join(" | ")+" "):new RegExp(" "+E+" "),n.targetParentElem){var h=n.targetElemParentStyles.getPropertyValue(t);if("line-height"===t){var v=parseFloat(n.targetElemStyles.getPropertyValue("font-size")),y=parseFloat(n.targetElemParentStyles.getPropertyValue("font-size")),S=y/v,L=1.14;g="normal"===g?v*L+"px":g,h="normal"===h?c.controlFloat(y*L,1)+"px":h}}var f=i.test(" "+g+" "),O=parseInt(g,10)>0,C=parseInt(g,10)<0,A=0===parseInt(g,10),_=g===m,R=c.controlFloat(parseFloat(g)*S,1)!==c.controlFloat(parseFloat(h),1),V=g===h,D=i.test(" "+n.targetElemParentDisplayProp+" ");(!p&&f||!p&&"over-0"===E&&O||!p&&"under-0"===E&&C||!p&&"default"===E&&_||!p&&"inherit"===E&&"line-height"===t&&R||!p&&"inherit"===E&&V||!p&&a&&D||p&&"0"===E&&!A||p&&"default"===E&&!_||p&&"inherit"===E&&"line-height"===t&&!R||p&&"inherit"===E&&!V||p&&a&&!D)&&(n.targetElem.classList.contains("stylev-target-error")||n.targetElem.classList.contains("stylev-target-warning")||c.errorIndex++,n.targetElem.dataset.stylevid="stylev-"+c.errorIndex,a?d.text="["+r.title+"] <"+n.targetElemTagName+"> display: "+n.targetElemDisplayPropVal+"; display property of parent element is incorrect.(parent is "+n.targetElemParentDisplayProp+" element)":d.text="["+r.title+"] <"+n.targetElemTagName+"> display: "+n.targetElemDisplayPropVal+"; "+t+": "+g+";"+(n.isDisplayPropChanged?"(Display Property has changed.)":""),d.idName=n.targetElem.dataset.stylevid,d.type=e,c.resultArray.push(d),"error"===e&&n.targetElem.classList.add("stylev-target-error"),"warning"===e&&n.targetElem.classList.add("stylev-target-warning"))},setupMutationObserver:function(){var e=STYLEV.VALIDATOR,t=["style","class"],o=1e3,n=3e3;if(!STYLEV.options.ENABLE_MUTATION_OBSERVER)return e.isObserving&&e.moManager.disconnect(),!1;e.observer=new MutationObserver(function(t){void 0!==e.observationTimer&&clearTimeout(e.observationTimer),e.observationTimer=setTimeout(function(){for(var o=[],n=!0,s=0,a=t.length;a>s;s++){var r=t[s],l=new RegExp(" "+STYLEV.ignoreElemsStylevId.join(" | ")+" ");if(!l.test(" "+r.target.dataset.stylevid+" ")){if(n=!1,STYLEV.affectedElemsStylevId.length&&(r.target.dataset.stylevid===STYLEV.affectedElemsStylevId[STYLEV.affectedElemsStylevId.length-1]?STYLEV.sameElemCount++:STYLEV.sameElemCount=0),STYLEV.sameElemCount<5?STYLEV.affectedElemsStylevId.push(r.target.dataset.stylevid):(STYLEV.affectedElemsStylevId=[],STYLEV.sameElemCount=0,STYLEV.ignoreElemsStylevId.push(r.target.dataset.stylevid)),r.target.tagName){for(var i,c=[],s=0,d=r.target.attributes,E=d.length;E>s;s++)i=d[s],0===s?c.push(" "+i.nodeName+'="'+i.nodeValue+'"'):c.push(i.nodeName+'="'+i.nodeValue+'"');o.push(r.target.dataset.stylevid+": <"+r.target.tagName.toLowerCase()+c.join(" ")+">")}if("attributes"===r.type&&o.push(r.attributeName+" "+r.type+' of above is changed from "'+r.oldValue+'".'),"characterData"===r.type&&o.push(r.characterData+" "+r.type+' of above is changed from "'+r.oldValue+'".'),r.addedNodes.length)for(var s=0,a=r.addedNodes.length;a>s;s++)o.push(r.addedNodes[s].outerHTML+" is added.");if(r.removedNodes.length)for(var s=0,a=r.removedNodes.length;a>s;s++)o.push(r.removedNodes[s].outerHTML+" is removed.");console.info(o.join("\n\n"))}}n||(STYLEV.isChromeExtension?STYLEV.CHROME_EXTENSION.execute():e.validate())},o),e.resetTImer=setInterval(function(){STYLEV.ignoreElemsStylevId=[]},n)});var s={attributes:!0,attributeFilter:t,childList:!0,subtree:!0,attributeOldValue:!0,characterDataOldValue:!0};return{connect:function(){e.isObserving||(e.observer.observe(document.querySelector("body"),s),e.observer.observe(document.querySelector("head"),s),e.isObserving=!0,console.info("Mutation Observer Connected"))},disconnect:function(){e.isObserving&&(clearTimeout(e.observationTimer),clearTimeout(e.resetTImer),e.observer.disconnect(),e.isObserving=!1,console.info("Mutation Observer Disconnected"))}}},insertStylesheet:function(){var e=STYLEV.VALIDATOR;return STYLEV.isUsingExtension?!1:(e.linkTag=document.createElement("link"),e.linkTag.id=e.settings.STYLESHEET_ID,e.linkTag.rel="stylesheet",e.linkTag.type="text/css",e.linkTag.classList.add("stylev-ignore"),e.linkTag.href=e.settings.STYLESHEET_PATH,e.head.appendChild(e.linkTag),!1)},removeStylesheet:function(){var e=STYLEV.VALIDATOR,t=document.querySelector("#stylev-stylesheet");null!==t&&e.head.removeChild(e.linkTag)},removeConsole:function(){var e=STYLEV.VALIDATOR,t=document.querySelector("html"),o=document.querySelector("#stylev-console-wrapper");null!==o&&(t.removeChild(o),t.style.setProperty("border-bottom-width",e.htmlDefaultBorderBottomWidth,""))},insertIframe4getDefaultStyles:function(){var e=STYLEV.VALIDATOR,t=document.querySelector("#stylev-dummy-iframe");if(null===t){e.iframe4test=document.createElement("iframe"),e.iframe4test.id="stylev-dummy-iframe",e.html.appendChild(e.iframe4test),e.iframeWindow=e.iframe4test.contentWindow,e.iframeDocument=e.iframeWindow.document,e.iframeBody=e.iframeDocument.querySelector("body");for(var o=document.createDocumentFragment(),n=0,s=e.tagsAllData.length;s>n;n++)o.appendChild(document.createElement(e.tagsAllData[n]));e.iframeBody.appendChild(o)}},removeIframe4getDefaultStyles:function(){var e=STYLEV.VALIDATOR,t=document.querySelector("#stylev-dummy-iframe");null!==t&&e.html.removeChild(t)},removeAllAttrAndEvents:function(){for(var e=STYLEV.VALIDATOR,t=document.querySelectorAll("*"),o=document.querySelector("html"),n=0,s=t.length;s>n;n++)t[n].removeAttribute("data-stylevid"),t[n].removeAttribute("data-stylevclass"),t[n].classList.remove("stylev-target-error"),t[n].classList.remove("stylev-target-warning"),t[n].removeEventListener("click",STYLEV.CHROME_DEVTOOLS.inspectFromTargets),t[n].removeEventListener("click",e.markElementFromTargets);void 0!==o&&o.removeEventListener("keyup",e.destroyByEsc)},showConsole:function(){var e=STYLEV.VALIDATOR;e.docFlag=document.createDocumentFragment(),e.consoleWrapper=document.createElement("div"),e.consoleWrapperShadowRoot=e.consoleWrapper.createShadowRoot(),STYLEV.isChromeExtension?e.consoleWrapperShadowRoot.innerHTML='<style>@import "'+STYLEV.CHROME_EXTENSION.RESOURCE_ROOT+'style-validator-for-console.css";</style>':e.consoleWrapperShadowRoot.innerHTML='<style>@import "'+e.settings.SERVER_RESOURCE_ROOT+'style-validator-for-console.css";</style>',e.consoleHeader=document.createElement("header"),e.consoleHeading=document.createElement("h1"),e.consoleHeadingLogo=document.createElement("a"),e.consoleHeadingLogoImage=document.createElement("img"),e.consoleMode=document.createElement("p"),e.consoleButtons=document.createElement("div"),e.consoleRefreshButton=document.createElement("a"),e.consoleRefreshButtonImage=document.createElement("img"),e.consoleCounter=document.createElement("div"),e.consoleFilterCheckBoxTotal=document.createElement("input"),e.consoleFilterCheckBoxError=document.createElement("input"),e.consoleFilterCheckBoxWarning=document.createElement("input"),e.consoleBody=document.createElement("div"),e.consoleList=document.createElement("ul"),e.consoleCloseButton=document.createElement("a"),e.consoleCloseButtonImage=document.createElement("img"),e.consoleMinimizeButton=document.createElement("a"),e.consoleMinimizeButtonImage=document.createElement("img"),e.consoleNormalizeButton=document.createElement("a"),e.consoleNormalizeButtonImage=document.createElement("img"),e.isMouseDownConsoleHeader=!1,e.consoleStartPosY=0,e.consoleCurrentPosY=0,e.consoleDiffPosY=0,e.consoleWrapper.id=e.settings.CONSOLE_WRAPPER_ID,e.consoleList.id=e.settings.CONSOLE_LIST_ID,e.consoleHeader.classList.add("stylev-console-header"),e.consoleHeading.classList.add("stylev-console-heading"),e.consoleHeadingLogo.classList.add("stylev-console-heading-logo"),e.consoleHeadingLogoImage.classList.add("stylev-console-heading-logo-image"),e.consoleHeadingLogoImage.src=e.settings.ICON_LOGO_PATH,e.consoleMode.classList.add("stylev-console-mode"),e.consoleButtons.classList.add("stylev-console-buttons"),e.consoleRefreshButton.href="javascript: void(0);",e.consoleRefreshButton.classList.add("stylev-console-refresh-button"),e.consoleRefreshButtonImage.classList.add("stylev-console-refresh-button-image"),e.consoleRefreshButtonImage.src=e.settings.ICON_REFRESH_PATH,e.consoleCounter.classList.add("stylev-console-counter"),e.consoleBody.classList.add("stylev-console-body"),e.consoleList.classList.add("stylev-console-list"),e.consoleCloseButton.href="javascript: void(0);",e.consoleCloseButton.classList.add("stylev-console-close-button"),e.consoleCloseButtonImage.classList.add("stylev-console-close-button-image"),e.consoleCloseButtonImage.src=e.settings.ICON_CLOSE_PATH,e.consoleMinimizeButton.href="javascript: void(0);",e.consoleMinimizeButton.classList.add("stylev-console-minimize-button"),e.consoleMinimizeButtonImage.classList.add("stylev-console-minimize-button-image"),e.consoleMinimizeButtonImage.src=e.settings.ICON_MINIMIZE_PATH,e.consoleNormalizeButton.href="javascript: void(0);",e.consoleNormalizeButton.hidden=!0,e.consoleNormalizeButton.classList.add("stylev-console-normalize-button"),e.consoleNormalizeButtonImage.classList.add("stylev-console-normalize-button-image"),e.consoleNormalizeButtonImage.src=e.settings.ICON_NORMALIZE_PATH,e.consoleFilterCheckBoxTotal.type="checkbox",e.consoleFilterCheckBoxError.type="checkbox",e.consoleFilterCheckBoxWarning.type="checkbox",e.createMessagesInConsole(),e.bindEvents4Console(),e.consoleHeadingText=document.createTextNode(e.settings.CONSOLE_HEADING_TEXT),e.consoleCounter.textContent="Total: "+e.resultArray.length+" / Error: "+e.errorNum+" / Warning: "+e.warningNum,e.consoleHeadingLogo.appendChild(e.consoleHeadingLogoImage),e.consoleHeadingLogo.appendChild(e.consoleHeadingText),e.consoleHeading.appendChild(e.consoleHeadingLogo),e.consoleRefreshButton.appendChild(e.consoleRefreshButtonImage),e.consoleNormalizeButton.appendChild(e.consoleNormalizeButtonImage),e.consoleMinimizeButton.appendChild(e.consoleMinimizeButtonImage),e.consoleCloseButton.appendChild(e.consoleCloseButtonImage),e.consoleButtons.appendChild(e.consoleRefreshButton),e.consoleButtons.appendChild(e.consoleMinimizeButton),e.consoleButtons.appendChild(e.consoleNormalizeButton),e.consoleButtons.appendChild(e.consoleCloseButton),e.consoleHeader.appendChild(e.consoleHeading),e.consoleHeader.appendChild(e.consoleButtons),e.consoleHeader.appendChild(e.consoleCounter),e.consoleHeader.appendChild(e.consoleMode),e.consoleWrapperShadowRoot.appendChild(e.consoleHeader),e.consoleWrapperShadowRoot.appendChild(e.consoleBody),e.consoleList.appendChild(e.docFlag),e.consoleBody.appendChild(e.consoleList),e.html.appendChild(e.consoleWrapper),e.doAfterParsedConsole()},doAfterParsedConsole:function(){var e=STYLEV.VALIDATOR;setTimeout(function(){e.consoleWrapper.style.setProperty("height",(STYLEV.consoleWrapperHeight||e.settings.CONSOLE_WRAPPER_DEFAULT_HEIGHT)+"px",""),e.consoleWrapperDefaultHeight=parseInt(e.consoleWrapper.offsetHeight,10),e.html.style.setProperty("border-bottom-width",e.consoleWrapperDefaultHeight+"px","important"),e.send2ChromeExtension(),e.restorePreviousCondition()},0)},send2ChromeExtension:function(){var e=STYLEV.VALIDATOR;STYLEV.isChromeExtension&&(chrome.runtime.sendMessage({setBadgeText:e.resultArray.length}),chrome.runtime.sendMessage({name:"switchMode"},function(t){if(void 0!==t.isConnected2Devtools){var o=document.createElement("img"),n=document.createTextNode(t.isConnected2Devtools?e.settings.CONNECTED_2_DEVTOOLS_MESSAGE:e.settings.DISCONNECTED_2_DEVTOOLS_MESSAGE);o.classList.add("stylev-console-mode-image"),o.src=t.isConnected2Devtools?e.settings.ICON_CONNECTED_PATH:e.settings.ICON_DISCONNECTED_PATH,e.consoleMode.appendChild(o),e.consoleMode.appendChild(n),e.consoleMode.classList.add(t.isConnected2Devtools?e.settings.CONNECTED_2_DEVTOOLS_CLASS:e.settings.DISCONNECTED_2_DEVTOOLS_CLASS)}}))},restorePreviousCondition:function(){var e=STYLEV.VALIDATOR;if(setTimeout(function(){e.consoleList.scrollTop=STYLEV.consoleScrollTop},0),e.consoleList.addEventListener("scroll",function(){STYLEV.consoleScrollTop=event.currentTarget.scrollTop}),"function"==typeof STYLEV.CHROME_DEVTOOLS.inspectOfConsoleAPI&&STYLEV.CHROME_DEVTOOLS.inspectOfConsoleAPI(),STYLEV.selectedLineInConsole)for(var t=e.consoleList.querySelectorAll("li"),o=0,n=t.length;n>o;o++)if(t[o].innerHTML===STYLEV.selectedLineInConsole.innerHTML){t[o].classList.add("stylev-trigger-selected");break}},createMessagesInConsole:function(){var e=STYLEV.VALIDATOR;if(0===e.resultArray.length)e.congratulationsMessage=document.createElement("li"),e.congratulationsMessage.classList.add("stylev-console-perfect"),e.congratulationsMessage.textContent=e.settings.CONGRATULATION_MESSAGE_TEXT,e.docFlag.appendChild(e.congratulationsMessage);else for(var t=0,o=e.resultArray.length;o>t;t++){var n=document.createElement("li"),s=document.createElement("a"),a=document.createElement("span"),r=e.resultArray[t];s.href="javascript: void(0);",s["stylev-console-index"]=t,s.addEventListener("click",e.markElementFromConsole.bind(e,r),!1),s.textContent=r.text,s.dataset.stylevconsoleid=r.idName,a.textContent=r.idName,n.classList.add("stylev-trigger-"+r.type),"error"===r.type&&e.errorNum++,"warning"===r.type&&e.warningNum++,s.appendChild(a),n.appendChild(s),e.docFlag.appendChild(n)}},bindEvents4Console:function(){var e=STYLEV.VALIDATOR;e.consoleWrapper.addEventListener("click",function(){event.preventDefault(),event.stopPropagation()},!1),e.consoleHeader.addEventListener("mousedown",function(){e.isMouseDownConsoleHeader=!0,e.consoleStartPosY=event.pageY},!1),e.html.addEventListener("mousemove",function(){e.isMouseDownConsoleHeader&&(e.consoleCurrentPosY=event.pageY,e.consoleDiffPosY=e.consoleStartPosY-e.consoleCurrentPosY,e.consoleWrapper.style.setProperty("height",e.consoleWrapperDefaultHeight+e.consoleDiffPosY+"px",""),event.currentTarget.style.setProperty("border-bottom-width",e.consoleWrapperDefaultHeight+e.consoleDiffPosY+"px","important"),30===e.consoleWrapper.offsetHeight?(e.consoleNormalizeButton.hidden=!1,e.consoleMinimizeButton.hidden=!0):e.consoleWrapper.offsetHeight>30&&(e.consoleNormalizeButton.hidden=!0,e.consoleMinimizeButton.hidden=!1))},!1),e.html.addEventListener("mouseup",function(){e.isMouseDownConsoleHeader=!1,e.consoleWrapperDefaultHeight=parseInt(e.consoleWrapper.offsetHeight,10),STYLEV.consoleWrapperHeight=e.consoleWrapperDefaultHeight},!1),e.consoleCloseButton.addEventListener("click",function(){event.preventDefault(),event.stopPropagation(),e.destroy()},!1),e.consoleRefreshButton.addEventListener("click",function(){event.preventDefault(),event.stopPropagation(),e.validate()},!1),e.consoleMinimizeButton.addEventListener("click",function(){event.preventDefault(),event.stopPropagation(),this.hidden=!0,e.consoleNormalizeButton.hidden=!1,e.minimize()},!1),e.consoleNormalizeButton.addEventListener("click",function(){event.preventDefault(),event.stopPropagation(),this.hidden=!0,e.consoleMinimizeButton.hidden=!1,e.normalize()},!1),e.html.addEventListener("keyup",function(){27===event.keyCode&&e.destroy()},!1)},markElementFromConsole:function(e){event.preventDefault(),event.stopPropagation();var t=STYLEV.VALIDATOR;t.isObserving&&t.moManager.disconnect();for(var o=document.querySelector("#stylev-console-wrapper").shadowRoot,n=o.querySelectorAll("li"),s=0,a=n.length;a>s;s++)n[s].classList.remove("stylev-trigger-selected");for(var r=o.querySelectorAll('[data-stylevconsoleid="'+event.currentTarget.dataset.stylevconsoleid+'"]'),s=0,a=r.length;a>s;s++){var l=r[s];l.parentElement.classList.add("stylev-trigger-selected"),0===s&&(STYLEV.selectedLineInConsole=l.parentElement)}for(var i=0,c=t.allElem.length;c>i;i++)t.allElem[i].classList.remove("stylev-target-selected");var d=document.querySelector('[data-stylevid="'+e.idName+'"]');d.classList.add("stylev-target-selected"),STYLEV.methods.smoothScroll.execute(d),t.isObserving||t.moManager.connect()},bind4targetElements:function(){var e=STYLEV.VALIDATOR;if(0===e.resultArray.length)return!1;e.consoleWrapper=document.querySelector("#stylev-console-wrapper"),e.consoleWrapperShadowRoot=e.consoleWrapper.shadowRoot,e.consoleTriggerWrapper=e.consoleWrapperShadowRoot.querySelector("ul"),e.consoleTriggers=e.consoleWrapperShadowRoot.querySelectorAll("li"),e.targets=document.querySelectorAll(".stylev-target-error,.stylev-target-warning");for(var t=0,o=e.targets.length;o>t;t++){var n=e.targets[t];n.addEventListener("click",e.markElementFromTargets,!1)}return!1},markElementFromTargets:function(){var e=STYLEV.VALIDATOR;e.isObserving&&e.moManager.disconnect(),event.stopPropagation(),event.preventDefault();for(var t=document.querySelector("#stylev-console-wrapper").shadowRoot,o=0,n=e.consoleTriggers.length;n>o;o++)e.consoleTriggers[o].classList.remove("stylev-trigger-selected");for(var s=t.querySelectorAll('[data-stylevconsoleid="'+event.currentTarget.dataset.stylevid+'"]'),o=0,a=s.length;a>o;o++){var r=s[o];r.parentElement.classList.add("stylev-trigger-selected"),0===o&&(STYLEV.selectedLineInConsole=r.parentElement)}for(var l=0,i=e.allElem.length;i>l;l++)e.allElem[l].classList.remove("stylev-target-selected");var c=document.querySelector('[data-stylevid="'+event.currentTarget.dataset.stylevid+'"]');c.classList.add("stylev-target-selected");var d=s[0].offsetTop;e.consoleTriggerWrapper.scrollTop=d,e.isObserving||e.moManager.connect()},controlFloat:function(e,t){return Math.round(parseFloat(e)*Math.pow(10,t))/Math.pow(10,t)},destroy:function(){var e=STYLEV.VALIDATOR;e.removeAllAttrAndEvents(),e.removeConsole(),e.isObserving&&e.moManager.disconnect(),e.removeStylesheet(),STYLEV.isChromeExtension&&setTimeout(function(){chrome.runtime.sendMessage({name:"validatedStatus2False"})},0)},minimize:function(){var e=STYLEV.VALIDATOR;e.consoleWrapper.style.setProperty("height",e.consoleHeader.style.getPropertyValue("height"),""),e.consoleWrapperDefaultHeight=e.consoleWrapper.offsetHeight},normalize:function(){var e=STYLEV.VALIDATOR;e.consoleWrapper.style.setProperty("height",e.settings.CONSOLE_WRAPPER_DEFAULT_HEIGHT+"px",""),e.consoleWrapperDefaultHeight=e.consoleWrapper.offsetHeight},setStyleDataBySelectors:function(e){for(var t=STYLEV.VALIDATOR,o=e.styleSheets,n=0,s=o.length;s>n;n++){var a=o[n],r=a.cssRules;if(null!==r)for(var l=0,i=r.length;i>l;l++){var c=r[l];if(!c.media&&void 0!==c.style&&void 0!==c.selectorText)for(var d=c.selectorText,E=c.style,m=E.width?E.width:"auto",g=E.height?E.height:"auto",p=E.getPropertyPriority("width"),u=E.getPropertyPriority("height"),T=SPECIFICITY.calculate(d),h=0,v=T.length;v>h;h++){var y=T[h],S=y.selector,L=parseInt(y.specificity.replace(/,/g,""),10);try{var f=e.querySelectorAll(S)}catch(O){continue}for(var C=0,A=f.length;A>C;C++){var _=f[C],R=_.style,V=R.width?R.width:"auto",D=R.height?R.height:"auto",I=V?1e3:L,N=D?1e3:L,Y=R.getPropertyPriority("width"),w=R.getPropertyPriority("height");void 0===_.dataset_stylevwidthspecificity&&(_.dataset_stylevwidthspecificity=I),void 0===_.dataset_stylevheightspecificity&&(_.dataset_stylevheightspecificity=N),void 0===_.dataset_stylevwidthimportant&&(_.dataset_stylevwidthimportant=Y),void 0===_.dataset_stylevheightimportant&&(_.dataset_stylevheightimportant=w),m&&!V&&I>=parseInt(_.dataset_stylevwidthspecificity,10)&&p.length>=_.dataset_stylevwidthimportant.length&&(_.dataset_stylevwidth=m,_.dataset_stylevwidthspecificity=I,_.dataset_stylevwidthimportant=p),m&&p&&!Y&&I>=parseInt(_.dataset_stylevwidthspecificity,10)&&p.length>=_.dataset_stylevwidthimportant.length&&(_.dataset_stylevwidth=m,_.dataset_stylevwidthspecificity=I,_.dataset_stylevwidthimportant=p),m&&!p&&V&&I>=parseInt(_.dataset_stylevwidthspecificity,10)&&Y.length>=_.dataset_stylevwidthimportant.length&&(_.dataset_stylevwidth=V,_.dataset_stylevwidthspecificity=I,_.dataset_stylevwidthimportant=Y),V&&Y&&I>=parseInt(_.dataset_stylevwidthspecificity,10)&&Y.length>=_.dataset_stylevwidthimportant.length&&(_.dataset_stylevwidth=V,_.dataset_stylevwidthspecificity=I,_.dataset_stylevwidthimportant=Y),g&&!D&&N>=parseInt(_.dataset_stylevheightspecificity,10)&&Y.length>=_.dataset_stylevheightimportant.length&&(_.dataset_stylevheight=g,_.dataset_stylevheightspecificity=N,_.dataset_stylevheightimportant=w),g&&u&&D&&N>=parseInt(_.dataset_stylevheightspecificity,10)&&Y.length>=_.dataset_stylevheightimportant.length&&(_.dataset_stylevheight=g,_.dataset_stylevheightspecificity=N,_.dataset_stylevheightimportant=w),g&&!u&&D&&N>=parseInt(_.dataset_stylevheightspecificity,10)&&Y.length>=_.dataset_stylevheightimportant.length&&(_.dataset_stylevheight=D,_.dataset_stylevheightspecificity=N,_.dataset_stylevheightimportant=w),D&&w&&N>=parseInt(_.dataset_stylevheightspecificity,10)&&Y.length>=_.dataset_stylevheightimportant.length&&(_.dataset_stylevheight=D,_.dataset_stylevheightspecificity=N,_.dataset_stylevheightimportant=w)}}}}t.setStyleDataByElements(e)},setStyleDataByElements:function(e){for(var t=e.querySelectorAll("*"),o=0,n=t.length;n>o;o++){var s=t[o];if(void 0===s.dataset_stylevwidth){var a=s.style.getPropertyValue("width");a?s.dataset_stylevwidth=a:s.dataset_stylevwidth="auto"}if(void 0===s.dataset_stylevheight){var r=s.style.getPropertyValue("height");r?s.dataset_stylevheight=r:s.dataset_stylevheight="auto"}}},getStyle:function(e,t,o){var n,s=o||null,a=getComputedStyle(e,s).getPropertyValue(t);return"width"===t||"height"===t?("width"===t&&(n=e.dataset_stylevwidth),"height"===t&&(n=e.dataset_stylevheight)):n=a,n}},STYLEV.methods={smoothScroll:{getOffsetTop:function(e){return"html"===e.nodeName.toLowerCase()?-window.pageYOffset:e.getBoundingClientRect().top+window.pageYOffset},easeInOutCubic:function(e){return.5>e?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1},getTargetPos:function(e,t,o,n){var s=STYLEV.methods.smoothScroll;return o>n?t:e+(t-e)*s.easeInOutCubic(o/n)},execute:function(e,t){var o=STYLEV.methods.smoothScroll,t=t||500,n=window.pageYOffset,s=o.getOffsetTop(e)-100,a=Date.now(),r=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(e){window.setTimeout(e,15)},l=function(){var e=Date.now()-a;window.scroll(0,o.getTargetPos(n,s,e,t)),t>=e&&r(l)};l()}}},STYLEV.CHROME_EXTENSION={RESOURCE_ROOT:null,execute:function(){console.info("Style Validator with Chrome Extension"),setTimeout(function(){chrome.runtime.sendMessage({name:"execute"})},0)}},STYLEV.CHROME_DEVTOOLS={execute:function(e){var t=STYLEV.CHROME_DEVTOOLS;return 0===STYLEV.VALIDATOR.resultArray.length?!1:(t.inspectOfConsoleAPI=e,t.setParameters(),t.bindEvents(),!1)},setParameters:function(){var e=STYLEV.CHROME_DEVTOOLS;e.consoleWrapper=document.querySelector("#stylev-console-wrapper"),e.consoleWrapperShadowRoot=e.consoleWrapper.shadowRoot,e.consoleList=e.consoleWrapperShadowRoot.querySelector("#stylev-console-list"),e.triggers=e.consoleList.querySelectorAll("a[data-stylevconsoleid]"),e.targets=document.querySelectorAll(".stylev-target-error,.stylev-target-warning")},bindEvents:function(){for(var e=STYLEV.CHROME_DEVTOOLS,t=0,o=e.triggers.length;o>t;t++)e.triggers[t].addEventListener("click",e.inspectFromConsole,!1);for(var n=0,s=e.targets.length;s>n;n++)e.targets[n].addEventListener("click",e.inspectFromTargets,!1)},inspectFromConsole:function(){event.preventDefault();var e=STYLEV.CHROME_DEVTOOLS,t=event.currentTarget,o=t.querySelector("span").textContent,n=document.querySelector('[data-stylevid="'+o+'"]');try{e.inspectOfConsoleAPI(n)}catch(s){console.error(s)}},inspectFromTargets:function(){event.preventDefault(),event.stopPropagation();var e=STYLEV.CHROME_DEVTOOLS,t=event.target;
try{e.inspectOfConsoleAPI(t)}catch(o){console.error(o)}}},STYLEV.isChromeExtension&&(STYLEV.VALIDATOR.updateOptions().then(function(){STYLEV.options.ENABLE_AUTO_EXECUTION?STYLEV.CHROME_EXTENSION.execute():STYLEV.isValidated?(STYLEV.VALIDATOR.destroy(),STYLEV.isValidated=!1):STYLEV.isValidated=!0,STYLEV.isUsingExtension=!0,STYLEV.CHROME_EXTENSION.RESOURCE_ROOT=chrome.runtime.getURL("")}),chrome.storage.onChanged.addListener(function(e,t){"sync"===t&&e.options&&(e.options.newValue.enableAnimation?STYLEV.VALIDATOR.html.classList.add("stylev-animation"):STYLEV.VALIDATOR.html.classList.remove("stylev-animation"))})),STYLEV.isBookmarklet&&STYLEV.isLoaded?(console.info("Style Validator with Bookmarklet."),STYLEV.VALIDATOR.execute(STYLEV.VALIDATOR.insertStylesheet)):STYLEV.isBookmarklet&&STYLEV.isReLoaded&&(console.info("Style Validator with Bookmarklet (ReExecution)"),STYLEV.VALIDATOR.validate());