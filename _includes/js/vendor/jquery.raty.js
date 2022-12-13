/*!
 * jQuery Raty - A Star Rating Plugin - http://wbotelhos.com/raty
 * -------------------------------------------------------------------
 *
 * jQuery Raty is a plugin that generates a customizable star rating.
 *
 * Licensed under The MIT License
 *
 * @version        2.4.5
 * @since          2010.06.11
 * @author         Washington Botelho
 * @documentation  wbotelhos.com/raty
 * @twitter        twitter.com/wbotelhos
 *
 * Usage:
 * -------------------------------------------------------------------
 * $('#star').raty();
 *
 * <div id="star"></div>
 *
 */(function(e){var t={init:function(n){return this.each(function(){var r=this,i=e(r).empty();r.opt=e.extend(!0,{},e.fn.raty.defaults,n),i.data("settings",r.opt),typeof r.opt.number=="function"?r.opt.number=r.opt.number.call(r):r.opt.number=t.between(r.opt.number,0,20),r.opt.path.substring(r.opt.path.length-1,r.opt.path.length)!="/"&&(r.opt.path+="/"),typeof r.opt.score=="function"&&(r.opt.score=r.opt.score.call(r)),r.opt.score&&(r.opt.score=t.between(r.opt.score,0,r.opt.number));for(var s=1;s<=r.opt.number;s++)e("<img />",{src:r.opt.path+(!r.opt.score||r.opt.score<s?r.opt.starOff:r.opt.starOn),alt:s,title:s<=r.opt.hints.length&&r.opt.hints[s-1]!==null?r.opt.hints[s-1]:s}).appendTo(r),r.opt.space&&i.append(s<r.opt.number?"&#160;":"");r.stars=i.children('img:not(".raty-cancel")'),r.score=e("<input />",{type:"hidden",name:r.opt.scoreName}).appendTo(r),r.opt.score&&r.opt.score>0&&(r.score.val(r.opt.score),t.roundStar.call(r,r.opt.score)),r.opt.iconRange&&t.fill.call(r,r.opt.score),t.setTarget.call(r,r.opt.score,r.opt.targetKeep);var o=r.opt.space?4:0,u=r.opt.width||r.opt.number*r.opt.size+r.opt.number*o;r.opt.cancel&&(r.cancel=e("<img />",{src:r.opt.path+r.opt.cancelOff,alt:"x",title:r.opt.cancelHint,"class":"raty-cancel"}),r.opt.cancelPlace=="left"?i.prepend("&#160;").prepend(r.cancel):i.append("&#160;").append(r.cancel),u+=r.opt.size+o),r.opt.readOnly?(t.fixHint.call(r),r.cancel&&r.cancel.hide()):(i.css("cursor","pointer"),t.bindAction.call(r)),i.css("width",u)})},between:function(e,t,n){return Math.min(Math.max(parseFloat(e),t),n)},bindAction:function(){var n=this,r=e(n);r.mouseleave(function(){var e=n.score.val()||undefined;t.initialize.call(n,e),t.setTarget.call(n,e,n.opt.targetKeep),n.opt.mouseover&&n.opt.mouseover.call(n,e)});var i=n.opt.half?"mousemove":"mouseover";n.opt.cancel&&n.cancel.mouseenter(function(){e(this).attr("src",n.opt.path+n.opt.cancelOn),n.stars.attr("src",n.opt.path+n.opt.starOff),t.setTarget.call(n,null,!0),n.opt.mouseover&&n.opt.mouseover.call(n,null)}).mouseleave(function(){e(this).attr("src",n.opt.path+n.opt.cancelOff),n.opt.mouseover&&n.opt.mouseover.call(n,n.score.val()||null)}).click(function(e){n.score.removeAttr("value"),n.opt.click&&n.opt.click.call(n,null,e)}),n.stars.bind(i,function(i){var s=parseInt(this.alt,10);if(n.opt.half){var o=parseFloat((i.pageX-e(this).offset().left)/n.opt.size),u=o>.5?1:.5;s=parseFloat(this.alt)-1+u,t.fill.call(n,s),n.opt.precision&&(s=s-u+o),t.showHalf.call(n,s)}else t.fill.call(n,s);r.data("score",s),t.setTarget.call(n,s,!0),n.opt.mouseover&&n.opt.mouseover.call(n,s,i)}).click(function(e){n.score.val(n.opt.half||n.opt.precision?r.data("score"):this.alt),n.opt.click&&n.opt.click.call(n,n.score.val(),e)})},cancel:function(n){return e(this).each(function(){var r=this,i=e(r);if(i.data("readonly")===!0)return this;n?t.click.call(r,null):t.score.call(r,null),r.score.removeAttr("value")})},click:function(n){return e(this).each(function(){if(e(this).data("readonly")===!0)return this;t.initialize.call(this,n),this.opt.click?this.opt.click.call(this,n):t.error.call(this,'you must add the "click: function(score, evt) { }" callback.'),t.setTarget.call(this,n,!0)})},error:function(t){e(this).html(t),e.error(t)},fill:function(e){var t=this,n=t.stars.length,r=0,i,s,o;for(var u=1;u<=n;u++)i=t.stars.eq(u-1),t.opt.iconRange&&t.opt.iconRange.length>r?(s=t.opt.iconRange[r],t.opt.single?o=u==e?s.on||t.opt.starOn:s.off||t.opt.starOff:o=u<=e?s.on||t.opt.starOn:s.off||t.opt.starOff,u<=s.range&&i.attr("src",t.opt.path+o),u==s.range&&r++):(t.opt.single?o=u==e?t.opt.starOn:t.opt.starOff:o=u<=e?t.opt.starOn:t.opt.starOff,i.attr("src",t.opt.path+o))},fixHint:function(){var t=e(this),n=parseInt(this.score.val(),10),r=this.opt.noRatedMsg;!isNaN(n)&&n>0&&(r=n<=this.opt.hints.length&&this.opt.hints[n-1]!==null?this.opt.hints[n-1]:n),t.data("readonly",!0).css("cursor","default").attr("title",r),this.score.attr("readonly","readonly"),this.stars.attr("title",r)},getScore:function(){var t=[],n;return e(this).each(function(){n=this.score.val(),t.push(n?parseFloat(n):undefined)}),t.length>1?t:t[0]},readOnly:function(n){return this.each(function(){var r=e(this);if(r.data("readonly")===n)return this;this.cancel&&(n?this.cancel.hide():this.cancel.show()),n?(r.unbind(),r.children("img").unbind(),t.fixHint.call(this)):(t.bindAction.call(this),t.unfixHint.call(this)),r.data("readonly",n)})},reload:function(){return t.set.call(this,{})},roundStar:function(e){var t=(e-Math.floor(e)).toFixed(2);if(t>this.opt.round.down){var n=this.opt.starOn;t<this.opt.round.up&&this.opt.halfShow?n=this.opt.starHalf:t<this.opt.round.full&&(n=this.opt.starOff),this.stars.eq(Math.ceil(e)-1).attr("src",this.opt.path+n)}},score:function(){return arguments.length?t.setScore.apply(this,arguments):t.getScore.call(this)},set:function(t){return this.each(function(){var n=e(this),r=n.data("settings"),i=n.clone().removeAttr("style").insertBefore(n);n.remove(),i.raty(e.extend(r,t))}),e(this.selector)},setScore:function(n){return e(this).each(function(){if(e(this).data("readonly")===!0)return this;t.initialize.call(this,n),t.setTarget.call(this,n,!0)})},setTarget:function(n,r){if(this.opt.target){var i=e(this.opt.target);i.length==0&&t.error.call(this,"target selector invalid or missing!");var s=n;!r||s===undefined?s=this.opt.targetText:this.opt.targetType=="hint"?s=s===null&&this.opt.cancel?this.opt.cancelHint:this.opt.hints[Math.ceil(s-1)]:s=this.opt.precision?parseFloat(s).toFixed(1):s,this.opt.targetFormat.indexOf("{score}")<0&&t.error.call(this,'template "{score}" missing!'),n!==null&&(s=this.opt.targetFormat.toString().replace("{score}",s)),i.is(":input")?i.val(s):i.html(s)}},showHalf:function(e){var t=(e-Math.floor(e)).toFixed(1);t>0&&t<.6&&this.stars.eq(Math.ceil(e)-1).attr("src",this.opt.path+this.opt.starHalf)},initialize:function(e){e=e?t.between(e,0,this.opt.number):0,t.fill.call(this,e),e>0&&(this.opt.halfShow&&t.roundStar.call(this,e),this.score.val(e))},unfixHint:function(){for(var t=0;t<this.opt.number;t++)this.stars.eq(t).attr("title",t<this.opt.hints.length&&this.opt.hints[t]!==null?this.opt.hints[t]:t);e(this).data("readonly",!1).css("cursor","pointer").removeAttr("title"),this.score.attr("readonly","readonly")}};e.fn.raty=function(n){if(t[n])return t[n].apply(this,Array.prototype.slice.call(arguments,1));if(typeof n=="object"||!n)return t.init.apply(this,arguments);e.error("Method "+n+" does not exist!")},e.fn.raty.defaults={cancel:!1,cancelHint:"cancel this rating!",cancelOff:"cancel-off.png",cancelOn:"cancel-on.png",cancelPlace:"left",click:undefined,half:!1,halfShow:!0,hints:["bad","poor","regular","good","gorgeous"],iconRange:undefined,mouseover:undefined,noRatedMsg:"not rated yet",number:5,path:"img/",precision:!1,round:{down:.25,full:.6,up:.76},readOnly:!1,score:undefined,scoreName:"score",single:!1,size:16,space:!0,starHalf:"star-half.png",starOff:"star-off.png",starOn:"star-on.png",target:undefined,targetFormat:"{score}",targetKeep:!1,targetText:"",targetType:"hint",width:undefined}})(jQuery);