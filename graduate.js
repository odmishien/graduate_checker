var category = []
var d_category = []
var c_category = []
var number = []
var subject = []
var credit = []

function course(course){
    if(course == "国際文化学部国際文化学科情報コミュニケーション論"){
        var course_name = "情報"
        var course_flag = "A"
    }else if(course == "国際文化学部国際文化学科現代文化論"){
        var course_name = "現代"
        var course_flag = "B"
    }else if(course == "国際文化学部国際文化学科異文化コミュニケーション論"){
        var course_name = "異文化"
        var course_flag = "C"
    }else if(course == "国際文化学部国際文化学科地域文化論"){
        var course_name = "地域"
        var course_flag = "D"
    }
    var courses = []
    courses.push(course_name);
    courses.push(course_flag);
    return courses;
}

function make_dict(li_1,li_2){
    var dict = {}
    for(var content in li_1){
        dict[li_1[content]] = li_2[content];
    }
    return dict;
    
}
function zengaku_kyotsu(category,d,c,sub,cre){
    var total = 0;
    var total_1 = 0;
    var total_2 = 0;
    var kenspo = 0;
    var zyohokiso = 0;
    var free_sentaku = 0;

    var credits = [];
    for(var subj in category){
        if(category[subj] == "全学共通授業科目"){
            free_sentaku += parseFloat(cre[subj]);
        }

        if(d[subj] == "教養原論"){
            total += parseFloat(cre[subj]);
        }else if(d[subj] == "その他の科目" ||d[subj] == "資格免許のための科目"){
            free_sentaku += parseFloat(cre[subj]);
        }
        
        if(c[subj] == "外国語第Ⅰ"){
            total_1 += parseFloat(cre[subj]);
        }else if(c[subj] == "外国語第Ⅱ"){
            total_2 += parseFloat(cre[subj]);
        }

        if(sub[subj] == "情報基礎"){
                zyohokiso += parseFloat(cre[subj]);
                free_sentaku -= 1.0
        }else if(sub[subj] == "健康・スポーツ科学実習I"){
                kenspo += parseFloat(cre[subj]);
                free_sentaku -= 1.0

        }
    }
        if(total >= 16.0){
            total = 16.0;
            free_sentaku -= 16.0;
        }else{
            free_sentaku -= total;
        }
        if(total_1 >= 4.0){
            total_1 = 4.0
            free_sentaku -= 4.0;
        }else{
            free_sentaku -= total_1;
        }
        if(total_2 >= 4.0){
            total_2 = 4.0
            free_sentaku -= 4.0;
        }else{
            free_sentaku -= total_2;
        }
    credits.splice(0,0,total,total_1,total_2,kenspo,zyohokiso,free_sentaku);
    return credits;
}

function senmon(category,d,c,sub,num,cre){
    var credits = [];
    var courses = course(c);
    var course_name = courses[0];
    var course_flag = courses[1];
    var zyohogairon = 0;
    var zyohoenshu = 0;
    var kisozemi = 0;
    var senmon_1 = 0;
    var senmon_2 = 0;

    var gai_enshu = 0;
    var gairon = 0;
    var sotsuronenshu = 0;
    var sotsuronkenkyu = 0;
    var senmon_enshu_A = 0;
    var senmon_enshu_B_1 = 0;
    var senmon_enshu_B_2 = 0;
    var senmon_enshu_B_3 = 0;
    var senmon_kougi = 0;
    var gakubu_sentaku = 0;
    var free_sentaku = 0;

    for (var subj in sub){
        if(sub[subj] == "情報科学概論"){
            zyohogairon += parseFloat(cre[subj]);
        }else if(sub[subj] == "情報科学演習I"){
            zyohoenshu += parseFloat(cre[subj]);
        }else if(sub[subj] == "基礎ゼミ"){
            kisozemi += parseFloat(cre[subj]);
        }else if(sub[subj] == "専門基礎英語（文章表現、会話）I"){
            senmon_1 += parseFloat(cre[subj]);
        }else if(sub[subj] == "専門基礎英語（文章表現、会話）II"){
            senmon_2 += parseFloat(cre[subj]);
        }else if(sub[subj] == "外国語演習" || sub[subj] == "外国語演習（グローバル専門科目）"){
            gai_enshu += parseFloat(cre[subj]);
        }else if(sub[subj] == "情報コミュニケーション概論" ||sub[subj] == "現代文化概論" ||sub[subj] == "異文化コミュニケーション概論" ||sub[subj] == "地域文化概論"){
            gairon += parseFloat(cre[subj]);
        }else if(sub[subj] == "専門演習Ａ（" + course_name + "）"){
            senmon_enshu_A += parseFloat(cre[subj]);
        }else if(sub[subj] == "専門演習Ｂ(1)（"+ course_name + "）"){
            senmon_enshu_B_1 += parseFloat(cre[subj]);
        }else if(sub[subj] == "専門演習Ｂ(2)（"+ course_name + "）"){
            senmon_enshu_B_2 += parseFloat(cre[subj]);
        }else if(sub[subj] == "専門演習Ｂ(3)（"+ course_name + "）"){
            senmon_enshu_B_3 += parseFloat(cre[subj]);
        }else if(sub[subj] == "卒論演習（"+ course_name + "）"){
            sotsuronenshu += parseFloat(cre[subj]);
        }else if(sub[subj] == "卒論研究（"+ course_name + "）"){
            sotsuronkenkyu += parseFloat(cre[subj]);
        }
    }

    for (var nums in num){
        //国文開講科目の検索
        if(num[nums].indexOf("C") == 0 && num[nums].indexOf("000") == -1){
            gakubu_sentaku += parseFloat(cre[nums]);
            //所属コース開講科目の検索
            if(num[nums].lastIndexOf(course_flag) == 3){
                senmon_kougi += parseFloat(cre[nums]);
            }
        }else if(num[nums] == "" && sub[nums].indexOf("専門演習") > -1){
           gakubu_sentaku += parseFloat(cre[nums]); 
        }else if(num[nums] == "" && sub[nums].indexOf("外国語演習") > -1){
            gakubu_sentaku += parseFloat(cre[nums]);
        }else if(num[nums] == "" && category[nums].indexOf("専門科目") > -1){
            if(d[nums].indexOf("選択科目") > -1){
                gakubu_sentaku += parseFloat(cre[nums]);
            }
        }
    }
    
    if(zyohogairon >= 2.0){
        gakubu_sentaku -= 2.0;
    }else{
        gakubu_sentaku -= zyohogairon;
    }
    if(zyohoenshu >= 2.0){
        gakubu_sentaku -= 2.0;
    }else{
        gakubu_sentaku -= zyohoenshu;
    }
    if(senmon_1 >= 1.0){
        gakubu_sentaku -= 1.0;
    }else{
        gakubu_sentaku -= senmon_1;
    }
    if(senmon_2 >= 1.0){
        gakubu_sentaku -= 1.0;
    }else{
        gakubu_sentaku -= senmon_2;
    }
    if(sotsuronenshu >= 2.0){
        sotsuronenshu = 2.0;
        gakubu_sentaku -= 2.0;
    }else{
        gakubu_sentaku -= sotsuronenshu;
    }
    if(sotsuronkenkyu >= 10.0){
        sotsuronkenkyu = 10.0;
        gakubu_sentaku -= 10.0;
    }else{
        gakubu_sentaku -= sotsuronkenkyu;
    }
    if(gai_enshu >= 2.0 ){
        gai_enshu = 2.0;
        gakubu_sentaku -= 2.0;
    }else{
        gakubu_sentaku -= gai_enshu;
    }
    if(gairon >= 4.0){
        gairon = 4.0;
        gakubu_sentaku -= 4.0;
    }else{
        gakubu_sentaku -= gairon;
    }
    if(senmon_enshu_A >= 2.0){
        senmon_enshu_A = 2.0;
        gakubu_sentaku -= 2.0;
    }else{
        gakubu_sentaku -= senmon_enshu_A;
    }
    if(senmon_enshu_B_1 >= 2.0){
        senmon_enshu_B_1 = 2.0;
        gakubu_sentaku -= 2.0;
    }else{
        gakubu_sentaku -= senmon_enshu_B_1;
    }
    if(senmon_enshu_B_2 >= 2.0){
        senmon_enshu_B_2 = 2.0;
        gakubu_sentaku -= 2.0;
    }else{
        gakubu_sentaku -= senmon_enshu_B_2;
    }
    if(senmon_enshu_B_3 >= 2.0){
        senmon_enshu_B_3 = 2.0;
        gakubu_sentaku -= 2.0;
    }else{
        gakubu_sentaku -= senmon_enshu_B_3;
    }
    if(senmon_kougi >= 10.0){
        senmon_kougi = 10.0;
        gakubu_sentaku -= 10.0;
    }else{
        gakubu_sentaku -= senmon_kougi;
    }

    if(gakubu_sentaku >= 50.0){
        var Promise = $.when(free_sentaku += (gakubu_sentaku - 50.0));
        Promise.done(gakubu_sentaku = 50.0);
    }
    credits.splice(0,0,kisozemi,senmon_1,senmon_2,zyohogairon,zyohoenshu,sotsuronenshu,sotsuronkenkyu,gairon,senmon_kougi,senmon_enshu_A,senmon_enshu_B_1,senmon_enshu_B_2,senmon_enshu_B_3,gai_enshu,gakubu_sentaku,free_sentaku);
    return credits;
}

$("#main-frame-if").on('load', function () {
    console.log("iframe loaded");
    var iframe = $(this).contents();
    var page = iframe.find("#main-portlet-title");
    var page_name = page[0].innerText;

    if (page_name == "単位修得状況照会"){
        var course_table = iframe.find("table")[0];
        var course = course_table.rows[1].cells[1].innerText;

        var table = iframe.find("table")[3];
        for (var i=1; i<table.rows.length; i++){
            var row = table.rows[i];
            category.push(row.cells[1].innerText);
            d_category.push(row.cells[2].innerText);
            c_category.push(row.cells[3].innerText);
            number.push(row.cells[4].innerText);
            subject.push(row.cells[5].innerText);
            credit.push(row.cells[6].innerText);
            }
        var zengaku_cre = zengaku_kyotsu(category,d_category,c_category,subject,credit)
        var senmon_cre = senmon(category,d_category,course,subject,number,credit);
        console.log(zengaku_cre);
        console.log(senmon_cre);
        var free = zengaku_cre[5] + senmon_cre[15]
        var total = 0;
        for(var cre in zengaku_cre){
            total += zengaku_cre[cre]
        }
        for(var cre in senmon_cre){
            total += senmon_cre[cre]
        }

        var contents = "<table border=\"1\"><tbody><tr><th>&nbsp;</th><td>&nbsp;</td><td>あなたの単位数</td><td>必要な単位数</td></tr><tr><th>教養原論</th><td>&nbsp;</td><td>"+ zengaku_cre[0] +"</td><td>16</td></tr><tr><th rowspan=\"2\">外国語科目</th><td>外国語第Ⅰ</td><td>"+ zengaku_cre[1] +"</td><td>4</td></tr><tr><td>外国語第Ⅱ</td><td>"+ zengaku_cre[2] +"</td><td>4</td></tr><tr><th>健康・スポーツ科学</th><td>健康・スポーツ科学実習Ⅰ</td><td>"+ zengaku_cre[3] +"</td><td>1</td></tr><tr><th>情報科目</th><td>情報基礎</td><td>"+ zengaku_cre[4] +"</td><td>1</td></tr><tr><th rowspan=\"7\">必修科目</th><td>基礎ゼミ</td><td>"+ senmon_cre[0] +"</td><td>2</td></tr><tr><td>専門基礎英語（文章表現、会話）I</td><td>"+ senmon_cre[1] +"</td><td>1</td></tr><tr><td>専門基礎英語（文章表現、会話）II</td><td>"+ senmon_cre[2] +"</td><td>1</td></tr><tr><td>情報科学概論</td><td>"+ senmon_cre[3] +"</td><td>2</td></tr><tr><td>情報科学演習I</td><td>"+ senmon_cre[4] +"</td><td>2</td></tr><tr><<td>卒論演習</td><td>"+ senmon_cre[5] +"</td><td>2</td></tr><tr><td>卒論研究</td><td>"+ senmon_cre[6] +"</td><td>10</td></tr><tr><th rowspan=\"7\">選択必修科目</th><td>各講座の「概論」</td><td>"+ senmon_cre[7] +"</td><td>4</td></tr><tr><td>所属講座の講義科目</td><td>"+ senmon_cre[8] +"</td><td>10</td></tr><tr><td>所属講座の専門演習A</td><td>"+ senmon_cre[9] +"</td><td>2</td></tr><tr><<td>所属講座の専門演習B(1)</td><td>"+ senmon_cre[10] +"</td><td>2</td></tr><tr><td>所属講座の専門演習B(2)</td><td>"+ senmon_cre[11] +"</td><td>2</td></tr><tr><td>所属講座の専門演習B(3)</td><td>"+ senmon_cre[12] +"</td><td>2</td></tr><tr><td>外国語演習</td><td>"+ senmon_cre[13] +"</td><td>2</td></tr><tr><th>学部選択科目</th><td>国文開講の授業科目</td><td>"+ senmon_cre[14] +"</td><td>50</td></tr><tr><th>自由選択科目</th><td>本学部、他学部授業、全学共通及び資格免許のための科目</td><td>"+ free +"</td><td>16</td></tr><tr><th>合計</th><td>&nbsp;</td><td>"+ total +"</td><td>136</td></tr></tbody></table>"
        page[0].insertAdjacentHTML('afterend',contents);
        }
    
    // console.log(d_category);
    // console.log(c_category);
    // console.log(subject);
    // console.log(credit);
    // console.log(kyogen_total);
    })