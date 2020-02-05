(function(f) {
    "function" === typeof define && define.amd ? define(["jquery", "moment"], f) : "object" === typeof exports && "undefined" !== typeof module ? module.exports = f(require("jquery"), require("moment")) : f(jQuery, moment)
})(function(f, e) {
    f.dateRangePickerLanguages = {
        "default": {
            selected: "Selected:",
            day: "Day",
            days: "Days",
            apply: "Close",
            "week-1": "mo",
            "week-2": "tu",
            "week-3": "we",
            "week-4": "th",
            "week-5": "fr",
            "week-6": "sa",
            "week-7": "su",
            "week-number": "W",
            "month-name": "january february march april may june july august september october november december".split(" "),
            shortcuts: "Shortcuts",
            "custom-values": "Custom Values",
            past: "Past",
            following: "Following",
            previous: "Previous",
            "prev-week": "Week",
            "prev-month": "Month",
            "prev-year": "Year",
            next: "Next",
            "next-week": "Week",
            "next-month": "Month",
            "next-year": "Year",
            "less-than": "Date range should not be more than %d days",
            "more-than": "Date range should not be less than %d days",
            "default-more": "Please select a date range longer than %d days",
            "default-single": "Please select a date",
            "default-less": "Please select a date range less than %d days",
            "default-range": "Please select a date range between %d and %d days",
            "default-default": "Please select a date range",
            time: "Time",
            hour: "Hour",
            minute: "Minute"
        },
        id: {
            selected: "Terpilih:",
            day: "Hari",
            days: "Hari",
            apply: "Tutup",
            "week-1": "sen",
            "week-2": "sel",
            "week-3": "rab",
            "week-4": "kam",
            "week-5": "jum",
            "week-6": "sab",
            "week-7": "min",
            "week-number": "W",
            "month-name": "januari februari maret april mei juni juli agustus september oktober november desember".split(" "),
            shortcuts: "Pintas",
            "custom-values": "Nilai yang ditentukan",
            past: "Yang Lalu",
            following: "Mengikuti",
            previous: "Sebelumnya",
            "prev-week": "Minggu",
            "prev-month": "Bulan",
            "prev-year": "Tahun",
            next: "Selanjutnya",
            "next-week": "Minggu",
            "next-month": "Bulan",
            "next-year": "Tahun",
            "less-than": "Tanggal harus lebih dari %d hari",
            "more-than": "Tanggal harus kurang dari %d hari",
            "default-more": "Jarak tanggal harus lebih lama dari %d hari",
            "default-single": "Silakan pilih tanggal",
            "default-less": "Jarak rentang tanggal tidak boleh lebih lama dari %d hari",
            "default-range": "Rentang tanggal harus antara %d dan %d hari",
            "default-default": "Silakan pilih rentang tanggal",
            time: "Waktu",
            hour: "Jam",
            minute: "Menit"
        },
        az: {
            selected: "Se\u00e7ildi:",
            day: " g\u00fcn",
            days: " g\u00fcn",
            apply: "t\u0259tbiq",
            "week-1": "1",
            "week-2": "2",
            "week-3": "3",
            "week-4": "4",
            "week-5": "5",
            "week-6": "6",
            "week-7": "7",
            "month-name": "yanvar fevral mart aprel may iyun iyul avqust sentyabr oktyabr noyabr dekabr".split(" "),
            shortcuts: "Q\u0131sayollar",
            past: "Ke\u00e7mi\u015f",
            following: "N\u00f6vb\u0259ti",
            previous: "&nbsp;&nbsp;&nbsp;",
            "prev-week": "\u00d6nc\u0259ki h\u0259ft\u0259",
            "prev-month": "\u00d6nc\u0259ki ay",
            "prev-year": "\u00d6nc\u0259ki il",
            next: "&nbsp;&nbsp;&nbsp;",
            "next-week": "N\u00f6vb\u0259ti h\u0259ft\u0259",
            "next-month": "N\u00f6vb\u0259ti ay",
            "next-year": "N\u00f6vb\u0259ti il",
            "less-than": "Tarix aral\u0131\u011f\u0131 %d g\u00fcnd\u0259n \u00e7ox olmamal\u0131d\u0131r",
            "more-than": "Tarix aral\u0131\u011f\u0131 %d g\u00fcnd\u0259n az olmamal\u0131d\u0131r",
            "default-more": "%d g\u00fcnd\u0259n \u00e7ox bir tarix se\u00e7in",
            "default-single": "Tarix se\u00e7in",
            "default-less": "%d g\u00fcnd\u0259n az bir tarix se\u00e7in",
            "default-range": "%d v\u0259 %d g\u00fcn aral\u0131\u011f\u0131nda tarixl\u0259r se\u00e7in",
            "default-default": "Tarix aral\u0131\u011f\u0131 se\u00e7in"
        },
        bg: {
            selected: "\u0418\u0437\u0431\u0440\u0430\u043d\u043e:",
            day: "\u0414\u0435\u043d",
            days: "\u0414\u043d\u0438",
            apply: "\u0417\u0430\u0442\u0432\u043e\u0440\u0438",
            "week-1": "\u043f\u043d",
            "week-2": "\u0432\u0442",
            "week-3": "\u0441\u0440",
            "week-4": "\u0447\u0442",
            "week-5": "\u043f\u0442",
            "week-6": "\u0441\u0431",
            "week-7": "\u043d\u0434",
            "week-number": "\u0421",
            "month-name": "\u044f\u043d\u0443\u0430\u0440\u0438 \u0444\u0435\u0432\u0440\u0443\u0430\u0440\u0438 \u043c\u0430\u0440\u0442 \u0430\u043f\u0440\u0438\u043b \u043c\u0430\u0439 \u044e\u043d\u0438 \u044e\u043b\u0438 \u0430\u0432\u0433\u0443\u0441\u0442 \u0441\u0435\u043f\u0442\u0435\u043c\u0432\u0440\u0438 \u043e\u043a\u0442\u043e\u043c\u0432\u0440\u0438 \u043d\u043e\u0435\u043c\u0432\u0440\u0438 \u0434\u0435\u043a\u0435\u043c\u0432\u0440\u0438".split(" "),
            shortcuts: "\u041f\u0440\u0435\u043a\u0438 \u043f\u044a\u0442\u0438\u0449\u0430",
            "custom-values": "\u041f\u0435\u0440\u0441\u043e\u043d\u0430\u043b\u0438\u0437\u0438\u0440\u0430\u043d\u0438 \u0441\u0442\u043e\u0439\u043d\u043e\u0441\u0442\u0438",
            past: "\u041c\u0438\u043d\u0430\u043b",
            following: "\u0421\u043b\u0435\u0434\u0432\u0430\u0449",
            previous: "\u041f\u0440\u0435\u0434\u0438\u0448\u0435\u043d",
            "prev-week": "\u0421\u0435\u0434\u043c\u0438\u0446\u0430",
            "prev-month": "\u041c\u0435\u0441\u0435\u0446",
            "prev-year": "\u0413\u043e\u0434\u0438\u043d\u0430",
            next: "\u0421\u043b\u0435\u0434\u0432\u0430\u0449",
            "next-week": "\u0421\u0435\u0434\u043c\u0438\u0446\u0430",
            "next-month": "\u041c\u0435\u0441\u0435\u0446",
            "next-year": "\u0413\u043e\u0434\u0438\u043d\u0430",
            "less-than": "\u041f\u0435\u0440\u0438\u043e\u0434\u044a\u0442 \u043e\u0442 \u0432\u0440\u0435\u043c\u0435 \u043d\u0435 \u0442\u0440\u044f\u0431\u0432\u0430 \u0434\u0430 \u0435 \u043f\u043e\u0432\u0435\u0447\u0435 \u043e\u0442 %d \u0434\u043d\u0438",
            "more-than": "\u041f\u0435\u0440\u0438\u043e\u0434\u044a\u0442 \u043e\u0442 \u0432\u0440\u0435\u043c\u0435 \u043d\u0435 \u0442\u0440\u044f\u0431\u0432\u0430 \u0434\u0430 \u0435 \u043f\u043e-\u043c\u0430\u043b\u043a\u043e \u043e\u0442 %d \u0434\u043d\u0438",
            "default-more": "\u041c\u043e\u043b\u044f \u0438\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u043f\u0435\u0440\u0438\u043e\u0434 \u043f\u043e-\u0434\u044a\u043b\u044a\u0433 \u043e\u0442 %d \u0434\u043d\u0438",
            "default-single": "\u041c\u043e\u043b\u044f \u0438\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u0434\u0430\u0442\u0430",
            "default-less": "\u041c\u043e\u043b\u044f \u0438\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u043f\u0435\u0440\u0438\u043e\u0434 \u043f\u043e-\u043a\u044a\u0441 \u043e\u0442 %d \u0434\u043d\u0438",
            "default-range": "\u041c\u043e\u043b\u044f \u0438\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u043f\u0435\u0440\u0438\u043e\u0434 \u043c\u0435\u0436\u0434\u0443 %d \u0438 %d \u0434\u043d\u0438",
            "default-default": "\u041c\u043e\u043b\u044f \u0438\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u043f\u0435\u0440\u0438\u043e\u0434",
            time: "\u0412\u0440\u0435\u043c\u0435",
            hour: "\u0427\u0430\u0441",
            minute: "\u041c\u0438\u043d\u0443\u0442\u0430"
        },
        cn: {
            selected: "\u5df2\u9009\u62e9:",
            day: "\u5929",
            days: "\u5929",
            apply: "\u786e\u5b9a",
            "week-1": "\u4e00",
            "week-2": "\u4e8c",
            "week-3": "\u4e09",
            "week-4": "\u56db",
            "week-5": "\u4e94",
            "week-6": "\u516d",
            "week-7": "\u65e5",
            "week-number": "\u5468",
            "month-name": "\u4e00\u6708 \u4e8c\u6708 \u4e09\u6708 \u56db\u6708 \u4e94\u6708 \u516d\u6708 \u4e03\u6708 \u516b\u6708 \u4e5d\u6708 \u5341\u6708 \u5341\u4e00\u6708 \u5341\u4e8c\u6708".split(" "),
            shortcuts: "\u5feb\u6377\u9009\u62e9",
            past: "\u8fc7\u53bb",
            following: "\u5c06\u6765",
            previous: "&nbsp;&nbsp;&nbsp;",
            "prev-week": "\u4e0a\u5468",
            "prev-month": "\u4e0a\u4e2a\u6708",
            "prev-year": "\u53bb\u5e74",
            next: "&nbsp;&nbsp;&nbsp;",
            "next-week": "\u4e0b\u5468",
            "next-month": "\u4e0b\u4e2a\u6708",
            "next-year": "\u660e\u5e74",
            "less-than": "\u6240\u9009\u65e5\u671f\u8303\u56f4\u4e0d\u80fd\u5927\u4e8e%d\u5929",
            "more-than": "\u6240\u9009\u65e5\u671f\u8303\u56f4\u4e0d\u80fd\u5c0f\u4e8e%d\u5929",
            "default-more": "\u8bf7\u9009\u62e9\u5927\u4e8e%d\u5929\u7684\u65e5\u671f\u8303\u56f4",
            "default-less": "\u8bf7\u9009\u62e9\u5c0f\u4e8e%d\u5929\u7684\u65e5\u671f\u8303\u56f4",
            "default-range": "\u8bf7\u9009\u62e9%d\u5929\u5230%d\u5929\u7684\u65e5\u671f\u8303\u56f4",
            "default-single": "\u8bf7\u9009\u62e9\u4e00\u4e2a\u65e5\u671f",
            "default-default": "\u8bf7\u9009\u62e9\u4e00\u4e2a\u65e5\u671f\u8303\u56f4",
            time: "\u65f6\u95f4",
            hour: "\u5c0f\u65f6",
            minute: "\u5206\u949f"
        },
        cz: {
            selected: "Vybr\u00e1no:",
            day: "Den",
            days: "Dny",
            apply: "Zav\u0159\u00edt",
            "week-1": "po",
            "week-2": "\u00fat",
            "week-3": "st",
            "week-4": "\u010dt",
            "week-5": "p\u00e1",
            "week-6": "so",
            "week-7": "ne",
            "month-name": "leden \u00fanor b\u0159ezen duben kv\u011bten \u010derven \u010dervenec srpen z\u00e1\u0159\u00ed \u0159\u00edjen listopad prosinec".split(" "),
            shortcuts: "Zkratky",
            past: "po",
            following: "n\u00e1sleduj\u00edc\u00ed",
            previous: "p\u0159edchoz\u00ed",
            "prev-week": "t\u00fdden",
            "prev-month": "m\u011bs\u00edc",
            "prev-year": "rok",
            next: "dal\u0161\u00ed",
            "next-week": "t\u00fdden",
            "next-month": "m\u011bs\u00edc",
            "next-year": "rok",
            "less-than": "Rozsah data by nem\u011bl b\u00fdt v\u011bt\u0161\u00ed ne\u017e %d dn\u016f",
            "more-than": "Rozsah data by nem\u011bl b\u00fdt men\u0161\u00ed ne\u017e %d dn\u016f",
            "default-more": "Pros\u00edm zvolte rozsah data v\u011bt\u0161\u00ed ne\u017e %d dn\u016f",
            "default-single": "Pros\u00edm zvolte datum",
            "default-less": "Pros\u00edm zvolte rozsah data men\u0161\u00ed ne\u017e %d dn\u016f",
            "default-range": "Pros\u00edm zvolte rozsah data mezi %d a %d dny",
            "default-default": "Pros\u00edm zvolte rozsah data"
        },
        de: {
            selected: "Auswahl:",
            day: "Tag",
            days: "Tage",
            apply: "Schlie\u00dfen",
            "week-1": "mo",
            "week-2": "di",
            "week-3": "mi",
            "week-4": "do",
            "week-5": "fr",
            "week-6": "sa",
            "week-7": "so",
            "month-name": "januar februar m\u00e4rz april mai juni juli august september oktober november dezember".split(" "),
            shortcuts: "Schnellwahl",
            past: "Vorherige",
            following: "Folgende",
            previous: "Vorherige",
            "prev-week": "Woche",
            "prev-month": "Monat",
            "prev-year": "Jahr",
            next: "N\u00e4chste",
            "next-week": "Woche",
            "next-month": "Monat",
            "next-year": "Jahr",
            "less-than": "Datumsbereich darf nicht gr\u00f6\u00dfer sein als %d Tage",
            "more-than": "Datumsbereich darf nicht kleiner sein als %d Tage",
            "default-more": "Bitte mindestens %d Tage ausw\u00e4hlen",
            "default-single": "Bitte ein Datum ausw\u00e4hlen",
            "default-less": "Bitte weniger als %d Tage ausw\u00e4hlen",
            "default-range": "Bitte einen Datumsbereich zwischen %d und %d Tagen ausw\u00e4hlen",
            "default-default": "Bitte ein Start- und Enddatum ausw\u00e4hlen",
            Time: "Zeit",
            hour: "Stunde",
            minute: "Minute"
        },
        es: {
            selected: "Seleccionado:",
            day: "D\u00eda",
            days: "D\u00edas",
            apply: "Cerrar",
            "week-1": "lu",
            "week-2": "ma",
            "week-3": "mi",
            "week-4": "ju",
            "week-5": "vi",
            "week-6": "sa",
            "week-7": "do",
            "month-name": "enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre".split(" "),
            shortcuts: "Accesos directos",
            past: "Pasado",
            following: "Siguiente",
            previous: "Anterior",
            "prev-week": "Semana",
            "prev-month": "Mes",
            "prev-year": "A\u00f1o",
            next: "Siguiente",
            "next-week": "Semana",
            "next-month": "Mes",
            "next-year": "A\u00f1o",
            "less-than": "El rango no deber\u00eda ser mayor de %d d\u00edas",
            "more-than": "El rango no deber\u00eda ser menor de %d d\u00edas",
            "default-more": "Por favor selecciona un rango mayor a %d d\u00edas",
            "default-single": "Por favor selecciona un d\u00eda",
            "default-less": "Por favor selecciona un rango menor a %d d\u00edas",
            "default-range": "Por favor selecciona un rango entre %d y %d d\u00edas",
            "default-default": "Por favor selecciona un rango de fechas."
        },
        fr: {
            selected: "S\u00e9lection:",
            day: "Jour",
            days: "Jours",
            apply: "Fermer",
            "week-1": "lu",
            "week-2": "ma",
            "week-3": "me",
            "week-4": "je",
            "week-5": "ve",
            "week-6": "sa",
            "week-7": "di",
            "month-name": "janvier f\u00e9vrier mars avril mai juin juillet ao\u00fbt septembre octobre novembre d\u00e9cembre".split(" "),
            shortcuts: "Raccourcis",
            past: "Pass\u00e9",
            following: "Suivant",
            previous: "Pr\u00e9c\u00e9dent",
            "prev-week": "Semaine",
            "prev-month": "Mois",
            "prev-year": "Ann\u00e9e",
            next: "Suivant",
            "next-week": "Semaine",
            "next-month": "Mois",
            "next-year": "Ann\u00e9e",
            "less-than": "L'intervalle ne doit pas \u00eatre sup\u00e9rieure \u00e0 %d jours",
            "more-than": "L'intervalle ne doit pas \u00eatre inf\u00e9rieure \u00e0 %d jours",
            "default-more": "Merci de choisir une intervalle sup\u00e9rieure \u00e0 %d jours",
            "default-single": "Merci de choisir une date",
            "default-less": "Merci de choisir une intervalle inf\u00e9rieure %d jours",
            "default-range": "Merci de choisir une intervalle comprise entre %d et %d jours",
            "default-default": "Merci de choisir une date"
        },
        hu: {
            selected: "Kiv\u00e1lasztva:",
            day: "Nap",
            days: "Nap",
            apply: "Ok",
            "week-1": "h",
            "week-2": "k",
            "week-3": "sz",
            "week-4": "cs",
            "week-5": "p",
            "week-6": "sz",
            "week-7": "v",
            "month-name": "janu\u00e1r febru\u00e1r m\u00e1rcius \u00e1prilis m\u00e1jus j\u00fanius j\u00falius augusztus szeptember okt\u00f3ber november december".split(" "),
            shortcuts: "Gyorsv\u00e1laszt\u00f3",
            past: "M\u00falt",
            following: "K\u00f6vetkez\u0151",
            previous: "El\u0151z\u0151",
            "prev-week": "H\u00e9t",
            "prev-month": "H\u00f3nap",
            "prev-year": "\u00c9v",
            next: "K\u00f6vetkez\u0151",
            "next-week": "H\u00e9t",
            "next-month": "H\u00f3nap",
            "next-year": "\u00c9v",
            "less-than": "A kiv\u00e1laszt\u00e1s nem lehet t\u00f6bb %d napn\u00e1l",
            "more-than": "A kiv\u00e1laszt\u00e1s nem lehet t\u00f6bb %d napn\u00e1l",
            "default-more": "V\u00e1lassz ki egy id\u0151szakot ami hosszabb mint %d nap",
            "default-single": "V\u00e1lassz egy napot",
            "default-less": "V\u00e1lassz ki egy id\u0151szakot ami r\u00f6videbb mint %d nap",
            "default-range": "V\u00e1lassz ki egy %d - %d nap hossz\u00fa id\u0151szakot",
            "default-default": "V\u00e1lassz ki egy id\u0151szakot"
        },
        it: {
            selected: "Selezionati:",
            day: "Giorno",
            days: "Giorni",
            apply: "Chiudi",
            "week-1": "lu",
            "week-2": "ma",
            "week-3": "me",
            "week-4": "gi",
            "week-5": "ve",
            "week-6": "sa",
            "week-7": "do",
            "month-name": "gennaio febbraio marzo aprile maggio giugno luglio agosto settembre ottobre novembre dicembre".split(" "),
            shortcuts: "Scorciatoie",
            past: "Scorso",
            following: "Successivo",
            previous: "Precedente",
            "prev-week": "Settimana",
            "prev-month": "Mese",
            "prev-year": "Anno",
            next: "Prossimo",
            "next-week": "Settimana",
            "next-month": "Mese",
            "next-year": "Anno",
            "less-than": "L'intervallo non dev'essere maggiore di %d giorni",
            "more-than": "L'intervallo non dev'essere minore di %d giorni",
            "default-more": "Seleziona un intervallo maggiore di %d giorni",
            "default-single": "Seleziona una data",
            "default-less": "Seleziona un intervallo minore di %d giorni",
            "default-range": "Seleziona un intervallo compreso tra i %d e i %d giorni",
            "default-default": "Seleziona un intervallo di date"
        },
        ko: {
            selected: "\uae30\uac04:",
            day: "\uc77c",
            days: "\uc77c\uac04",
            apply: "\ub2eb\uae30",
            "week-1": "\uc6d4",
            "week-2": "\ud654",
            "week-3": "\uc218",
            "week-4": "\ubaa9",
            "week-5": "\uae08",
            "week-6": "\ud1a0",
            "week-7": "\uc77c",
            "week-number": "\uc8fc",
            "month-name": "1\uc6d4 2\uc6d4 3\uc6d4 4\uc6d4 5\uc6d4 6\uc6d4 7\uc6d4 8\uc6d4 9\uc6d4 10\uc6d4 11\uc6d4 12\uc6d4".split(" "),
            shortcuts: "\ub2e8\ucd95\ud0a4\ub4e4",
            past: "\uc9c0\ub09c(\uc624\ub298\uae30\uc900)",
            following: "\uc774\ud6c4(\uc624\ub298\uae30\uc900)",
            previous: "\uc774\uc804",
            "prev-week": "1\uc8fc",
            "prev-month": "1\ub2ec",
            "prev-year": "1\ub144",
            next: "\ub2e4\uc74c",
            "next-week": "1\uc8fc",
            "next-month": "1\ub2ec",
            "next-year": "1\ub144",
            "less-than": "\ub0a0\uc9dc \ubc94\uc704\ub294 %d \uc77c\ubcf4\ub2e4 \ub9ce\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4",
            "more-than": "\ub0a0\uc9dc \ubc94\uc704\ub294 %d \uc77c\ubcf4\ub2e4 \uc791\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4",
            "default-more": "\ub0a0\uc9dc \ubc94\uc704\ub97c %d \uc77c\ubcf4\ub2e4 \uae38\uac8c \uc120\ud0dd\ud574 \uc8fc\uc138\uc694",
            "default-single": "\ub0a0\uc9dc\ub97c \uc120\ud0dd\ud574 \uc8fc\uc138\uc694",
            "default-less": "%d \uc77c\ubcf4\ub2e4 \uc791\uc740 \ub0a0\uc9dc\ub97c \uc120\ud0dd\ud574 \uc8fc\uc138\uc694",
            "default-range": "%d\uc640 %d \uc77c \uc0ac\uc774\uc758 \ub0a0\uc9dc \ubc94\uc704\ub97c \uc120\ud0dd\ud574 \uc8fc\uc138\uc694",
            "default-default": "\ub0a0\uc9dc \ubc94\uc704\ub97c \uc120\ud0dd\ud574 \uc8fc\uc138\uc694",
            time: "\uc2dc\uac01",
            hour: "\uc2dc",
            minute: "\ubd84"
        },
        no: {
            selected: "Valgt:",
            day: "Dag",
            days: "Dager",
            apply: "Lukk",
            "week-1": "ma",
            "week-2": "ti",
            "week-3": "on",
            "week-4": "to",
            "week-5": "fr",
            "week-6": "l\u00f8",
            "week-7": "s\u00f8",
            "month-name": "januar februar mars april mai juni juli august september oktober november desember".split(" "),
            shortcuts: "Snarveier",
            "custom-values": "Egendefinerte Verdier",
            past: "Over",
            following: "F\u00f8lger",
            previous: "Forrige",
            "prev-week": "Uke",
            "prev-month": "M\u00e5ned",
            "prev-year": "\u00c5r",
            next: "Neste",
            "next-week": "Uke",
            "next-month": "M\u00e5ned",
            "next-year": "\u00c5r",
            "less-than": "Datoperioden skal ikkje v\u00e6re lengre enn %d dager",
            "more-than": "Datoperioden skal ikkje v\u00e6re kortere enn %d dager",
            "default-more": "Vennligst velg ein datoperiode lengre enn %d dager",
            "default-single": "Vennligst velg ein dato",
            "default-less": "Vennligst velg ein datoperiode mindre enn %d dager",
            "default-range": "Vennligst velg ein datoperiode mellom %d og %d dager",
            "default-default": "Vennligst velg ein datoperiode",
            time: "Tid",
            hour: "Time",
            minute: "Minutter"
        },
        nl: {
            selected: "Geselecteerd:",
            day: "Dag",
            days: "Dagen",
            apply: "Ok",
            "week-1": "ma",
            "week-2": "di",
            "week-3": "wo",
            "week-4": "do",
            "week-5": "vr",
            "week-6": "za",
            "week-7": "zo",
            "month-name": "januari februari maart april mei juni juli augustus september oktober november december".split(" "),
            shortcuts: "Snelkoppelingen",
            "custom-values": "Aangepaste waarden",
            past: "Verleden",
            following: "Komend",
            previous: "Vorige",
            "prev-week": "Week",
            "prev-month": "Maand",
            "prev-year": "Jaar",
            next: "Volgende",
            "next-week": "Week",
            "next-month": "Maand",
            "next-year": "Jaar",
            "less-than": "Interval moet langer dan %d dagen zijn",
            "more-than": "Interval mag niet minder dan %d dagen zijn",
            "default-more": "Selecteer een interval langer dan %dagen",
            "default-single": "Selecteer een datum",
            "default-less": "Selecteer een interval minder dan %d dagen",
            "default-range": "Selecteer een interval tussen %d en %d dagen",
            "default-default": "Selecteer een interval",
            time: "Tijd",
            hour: "Uur",
            minute: "Minuut"
        },
        ru: {
            selected: "\u0412\u044b\u0431\u0440\u0430\u043d\u043e:",
            day: "\u0414\u0435\u043d\u044c",
            days: "\u0414\u043d\u0435\u0439",
            apply: "\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c",
            "week-1": "\u043f\u043d",
            "week-2": "\u0432\u0442",
            "week-3": "\u0441\u0440",
            "week-4": "\u0447\u0442",
            "week-5": "\u043f\u0442",
            "week-6": "\u0441\u0431",
            "week-7": "\u0432\u0441",
            "month-name": "\u044f\u043d\u0432\u0430\u0440\u044c \u0444\u0435\u0432\u0440\u0430\u043b\u044c \u043c\u0430\u0440\u0442 \u0430\u043f\u0440\u0435\u043b\u044c \u043c\u0430\u0439 \u0438\u044e\u043d\u044c \u0438\u044e\u043b\u044c \u0430\u0432\u0433\u0443\u0441\u0442 \u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044c \u043e\u043a\u0442\u044f\u0431\u0440\u044c \u043d\u043e\u044f\u0431\u0440\u044c \u0434\u0435\u043a\u0430\u0431\u0440\u044c".split(" "),
            shortcuts: "\u0411\u044b\u0441\u0442\u0440\u044b\u0439 \u0432\u044b\u0431\u043e\u0440",
            "custom-values": "\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f",
            past: "\u041f\u0440\u043e\u0448\u0435\u0434\u0448\u0438\u0435",
            following: "\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0435",
            previous: "&nbsp;&nbsp;&nbsp;",
            "prev-week": "\u041d\u0435\u0434\u0435\u043b\u044f",
            "prev-month": "\u041c\u0435\u0441\u044f\u0446",
            "prev-year": "\u0413\u043e\u0434",
            next: "&nbsp;&nbsp;&nbsp;",
            "next-week": "\u041d\u0435\u0434\u0435\u043b\u044f",
            "next-month": "\u041c\u0435\u0441\u044f\u0446",
            "next-year": "\u0413\u043e\u0434",
            "less-than": "\u0414\u0438\u0430\u043f\u0430\u0437\u043e\u043d \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435 %d \u0434\u043d\u0435\u0439",
            "more-than": "\u0414\u0438\u0430\u043f\u0430\u0437\u043e\u043d \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0431\u044b\u0442\u044c \u043c\u0435\u043d\u044c\u0448\u0435 %d \u0434\u043d\u0435\u0439",
            "default-more": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0438\u0430\u043f\u0430\u0437\u043e\u043d \u0431\u043e\u043b\u044c\u0448\u0435 %d \u0434\u043d\u0435\u0439",
            "default-single": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0430\u0442\u0443",
            "default-less": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0438\u0430\u043f\u0430\u0437\u043e\u043d \u043c\u0435\u043d\u044c\u0448\u0435 %d \u0434\u043d\u0435\u0439",
            "default-range": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0438\u0430\u043f\u0430\u0437\u043e\u043d \u043c\u0435\u0436\u0434\u0443 %d \u0438 %d \u0434\u043d\u044f\u043c\u0438",
            "default-default": "\u041f\u043e\u0436\u0430\u043b\u0443\u0439\u0441\u0442\u0430 \u0432\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0438\u0430\u043f\u0430\u0437\u043e\u043d",
            time: "\u0412\u0440\u0435\u043c\u044f",
            hour: "\u0427\u0430\u0441\u044b",
            minute: "\u041c\u0438\u043d\u0443\u0442\u044b"
        },
        pl: {
            selected: "Wybrany:",
            day: "Dzie\u0144",
            days: "Dni",
            apply: "Zamknij",
            "week-1": "pon",
            "week-2": "wt",
            "week-3": "\u015br",
            "week-4": "czw",
            "week-5": "pt",
            "week-6": "so",
            "week-7": "nd",
            "month-name": "stycze\u0144 luty marzec kwiecie\u0144 maj czerwiec lipiec sierpie\u0144 wrzesie\u0144 pa\u017adziernik listopad grudzie\u0144".split(" "),
            shortcuts: "Skr\u00f3ty",
            "custom-values": "Niestandardowe warto\u015bci",
            past: "Przesz\u0142e",
            following: "Nast\u0119pne",
            previous: "Poprzednie",
            "prev-week": "tydzie\u0144",
            "prev-month": "miesi\u0105c",
            "prev-year": "rok",
            next: "Nast\u0119pny",
            "next-week": "tydzie\u0144",
            "next-month": "miesi\u0105c",
            "next-year": "rok",
            "less-than": "Okres nie powinien by\u0107 d\u0142u\u017cszy ni\u017c %d dni",
            "more-than": "Okres nie powinien by\u0107 kr\u00f3tszy ni\u017c  %d ni",
            "default-more": "Wybierz okres d\u0142u\u017cszy ni\u017c %d dni",
            "default-single": "Wybierz dat\u0119",
            "default-less": "Wybierz okres kr\u00f3tszy ni\u017c %d dni",
            "default-range": "Wybierz okres trwaj\u0105cy od %d do %d dni",
            "default-default": "Wybierz okres",
            time: "Czas",
            hour: "Godzina",
            minute: "Minuta"
        },
        se: {
            selected: "Vald:",
            day: "dag",
            days: "dagar",
            apply: "godk\u00e4nn",
            "week-1": "ma",
            "week-2": "ti",
            "week-3": "on",
            "week-4": "to",
            "week-5": "fr",
            "week-6": "l\u00f6",
            "week-7": "s\u00f6",
            "month-name": "januari februari mars april maj juni juli augusti september oktober november december".split(" "),
            shortcuts: "genv\u00e4gar",
            "custom-values": "Anpassade v\u00e4rden",
            past: "\u00f6ver",
            following: "f\u00f6ljande",
            previous: "f\u00f6rra",
            "prev-week": "vecka",
            "prev-month": "m\u00e5nad",
            "prev-year": "\u00e5r",
            next: "n\u00e4sta",
            "next-week": "vecka",
            "next-month": "m\u00e5ned",
            "next-year": "\u00e5r",
            "less-than": "Datumintervall b\u00f6r inte vara mindre \u00e4n %d dagar",
            "more-than": "Datumintervall b\u00f6r inte vara mer \u00e4n %d dagar",
            "default-more": "V\u00e4lj ett datumintervall l\u00e4ngre \u00e4n %d dagar",
            "default-single": "V\u00e4lj ett datum",
            "default-less": "V\u00e4lj ett datumintervall mindre \u00e4n %d dagar",
            "default-range": "V\u00e4lj ett datumintervall mellan %d och %d dagar",
            "default-default": "V\u00e4lj ett datumintervall",
            time: "tid",
            hour: "timme",
            minute: "minut"
        },
        pt: {
            selected: "Selecionado:",
            day: "Dia",
            days: "Dias",
            apply: "Fechar",
            "week-1": "seg",
            "week-2": "ter",
            "week-3": "qua",
            "week-4": "qui",
            "week-5": "sex",
            "week-6": "sab",
            "week-7": "dom",
            "week-number": "N",
            "month-name": "janeiro fevereiro mar\u00e7o abril maio junho julho agosto setembro outubro novembro dezembro".split(" "),
            shortcuts: "Atalhos",
            "custom-values": "Valores Personalizados",
            past: "Passado",
            following: "Seguinte",
            previous: "Anterior",
            "prev-week": "Semana",
            "prev-month": "M\u00eas",
            "prev-year": "Ano",
            next: "Pr\u00f3ximo",
            "next-week": "Pr\u00f3xima Semana",
            "next-month": "Pr\u00f3ximo M\u00eas",
            "next-year": "Pr\u00f3ximo Ano",
            "less-than": "O per\u00edodo selecionado n\u00e3o deve ser maior que %d dias",
            "more-than": "O per\u00edodo selecionado n\u00e3o deve ser menor que %d dias",
            "default-more": "Selecione um per\u00edodo superior a %d dias",
            "default-single": "Selecione uma data",
            "default-less": "Selecione um per\u00edodo inferior a %d dias",
            "default-range": "Selecione um per\u00edodo de %d a %d dias",
            "default-default": "Selecione um per\u00edodo",
            time: "Tempo",
            hour: "Hora",
            minute: "Minuto"
        },
        tc: {
            selected: "\u5df2\u9078\u64c7:",
            day: "\u5929",
            days: "\u5929",
            apply: "\u78ba\u5b9a",
            "week-1": "\u4e00",
            "week-2": "\u4e8c",
            "week-3": "\u4e09",
            "week-4": "\u56db",
            "week-5": "\u4e94",
            "week-6": "\u516d",
            "week-7": "\u65e5",
            "week-number": "\u5468",
            "month-name": "\u4e00\u6708 \u4e8c\u6708 \u4e09\u6708 \u56db\u6708 \u4e94\u6708 \u516d\u6708 \u4e03\u6708 \u516b\u6708 \u4e5d\u6708 \u5341\u6708 \u5341\u4e00\u6708 \u5341\u4e8c\u6708".split(" "),
            shortcuts: "\u5feb\u901f\u9078\u64c7",
            past: "\u904e\u53bb",
            following: "\u5c07\u4f86",
            previous: "&nbsp;&nbsp;&nbsp;",
            "prev-week": "\u4e0a\u9031",
            "prev-month": "\u4e0a\u500b\u6708",
            "prev-year": "\u53bb\u5e74",
            next: "&nbsp;&nbsp;&nbsp;",
            "next-week": "\u4e0b\u5468",
            "next-month": "\u4e0b\u500b\u6708",
            "next-year": "\u660e\u5e74",
            "less-than": "\u6240\u9078\u65e5\u671f\u7bc4\u570d\u4e0d\u80fd\u5927\u65bc%d\u5929",
            "more-than": "\u6240\u9078\u65e5\u671f\u7bc4\u570d\u4e0d\u80fd\u5c0f\u65bc%d\u5929",
            "default-more": "\u8acb\u9078\u64c7\u5927\u65bc%d\u5929\u7684\u65e5\u671f\u7bc4\u570d",
            "default-less": "\u8acb\u9078\u64c7\u5c0f\u65bc%d\u5929\u7684\u65e5\u671f\u7bc4\u570d",
            "default-range": "\u8acb\u9078\u64c7%d\u5929\u5230%d\u5929\u7684\u65e5\u671f\u7bc4\u570d",
            "default-single": "\u8acb\u9078\u64c7\u4e00\u500b\u65e5\u671f",
            "default-default": "\u8acb\u9078\u64c7\u4e00\u500b\u65e5\u671f\u7bc4\u570d",
            time: "\u65e5\u671f",
            hour: "\u5c0f\u6642",
            minute: "\u5206\u9418"
        },
        ja: {
            selected: "\u9078\u629e\u3057\u307e\u3057\u305f:",
            day: "\u65e5",
            days: "\u65e5\u3005",
            apply: "\u9589\u3058\u308b",
            "week-1": "\u6708",
            "week-2": "\u706b",
            "week-3": "\u6c34",
            "week-4": "\u6728",
            "week-5": "\u91d1",
            "week-6": "\u571f",
            "week-7": "\u65e5",
            "month-name": "1\u6708 2\u6708 3\u6708 4\u6708 5\u6708 6\u6708 7\u6708 8\u6708 9\u6708 10\u6708 11\u6708 12\u6708".split(" "),
            shortcuts: "\u30af\u30a4\u30c3\u30af\u9078\u629e",
            past: "\u904e\u53bb",
            following: "\u5c06\u6765",
            previous: "&nbsp;&nbsp;&nbsp;",
            "prev-week": "\u5148\u9031\u3001",
            "prev-month": "\u5148\u6708",
            "prev-year": "\u6628\u5e74",
            next: "&nbsp;&nbsp;&nbsp;",
            "next-week": "\u6765\u9031",
            "next-month": "\u6765\u6708",
            "next-year": "\u6765\u5e74",
            "less-than": "\u65e5\u4ed8\u306e\u7bc4\u56f2\u306f \uff05d \u65e5\u4ee5\u4e0a\u306b\u3059\u3079\u304d\u3067\u306f\u3042\u308a\u307e\u305b\u3093",
            "more-than": "\u65e5\u4ed8\u306e\u7bc4\u56f2\u306f \uff05d \u65e5\u3092\u4e0b\u56de\u3063\u3066\u306f\u3044\u3051\u307e\u305b\u3093",
            "default-more": "\uff05d \u65e5\u3088\u308a\u3082\u9577\u3044\u671f\u9593\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044",
            "default-less": "\uff05d \u65e5\u672a\u6e80\u306e\u671f\u9593\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044",
            "default-range": "\uff05d \u3068\uff05 d\u65e5\u306e\u9593\u306e\u65e5\u4ed8\u7bc4\u56f2\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044",
            "default-single": "\u65e5\u4ed8\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044",
            "default-default": "\u65e5\u4ed8\u7bc4\u56f2\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044",
            time: "\u6642\u9593",
            hour: "\u6642\u9593",
            minute: "\u5206"
        },
        da: {
            selected: "Valgt:",
            day: "Dag",
            days: "Dage",
            apply: "Luk",
            "week-1": "ma",
            "week-2": "ti",
            "week-3": "on",
            "week-4": "to",
            "week-5": "fr",
            "week-6": "l\u00f6",
            "week-7": "s\u00f6",
            "month-name": "januar februar marts april maj juni juli august september oktober november december".split(" "),
            shortcuts: "genveje",
            "custom-values": "Brugerdefinerede v\u00e6rdier",
            past: "Forbi",
            following: "F\u00f8lgende",
            previous: "Forrige",
            "prev-week": "uge",
            "prev-month": "m\u00e5nad",
            "prev-year": "\u00e5r",
            next: "N\u00e6ste",
            "next-week": "N\u00e6ste uge",
            "next-month": "N\u00e6ste m\u00e5ned",
            "next-year": "N\u00e6ste \u00e5r",
            "less-than": "Dato interval b\u00f8r ikke v\u00e6re med end %d dage",
            "more-than": "Dato interval b\u00f8r ikke v\u00e6re mindre end %d dage",
            "default-more": "V\u00e6lg datointerval l\u00e6ngere end %d dage",
            "default-single": "V\u00e6lg dato",
            "default-less": "V\u00e6lg datointerval mindre end %d dage",
            "default-range": "V\u00e6lg datointerval mellem %d og %d dage",
            "default-default": "V\u00e6lg datointerval",
            time: "tid",
            hour: "time",
            minute: "minut"
        },
        fi: {
            selected: "Valittu:",
            day: "P\u00e4iv\u00e4",
            days: "P\u00e4iv\u00e4\u00e4",
            apply: "Sulje",
            "week-1": "ma",
            "week-2": "ti",
            "week-3": "ke",
            "week-4": "to",
            "week-5": "pe",
            "week-6": "la",
            "week-7": "su",
            "week-number": "V",
            "month-name": "tammikuu helmikuu maaliskuu huhtikuu toukokuu kes\u00e4kuu hein\u00e4kuu elokuu syyskuu lokakuu marraskuu joulukuu".split(" "),
            shortcuts: "Pikavalinnat",
            "custom-values": "Mukautetut Arvot",
            past: "Menneet",
            following: "Tulevat",
            previous: "Edellinen",
            "prev-week": "Viikko",
            "prev-month": "Kuukausi",
            "prev-year": "Vuosi",
            next: "Seuraava",
            "next-week": "Viikko",
            "next-month": "Kuukausi",
            "next-year": "Vuosi",
            "less-than": "Aikajakson tulisi olla v\u00e4hemm\u00e4n kuin %d p\u00e4iv\u00e4\u00e4",
            "more-than": "Aikajakson ei tulisi olla v\u00e4hemp\u00e4\u00e4 kuin %d p\u00e4iv\u00e4\u00e4",
            "default-more": "Valitse pidempi aikajakso kuin %d p\u00e4iv\u00e4\u00e4",
            "default-single": "Valitse p\u00e4iv\u00e4",
            "default-less": "Valitse lyhyempi aikajakso kuin %d p\u00e4iv\u00e4\u00e4",
            "default-range": "Valitse aikajakso %d ja %d p\u00e4iv\u00e4n v\u00e4lilt\u00e4",
            "default-default": "Valitse aikajakso",
            time: "Aika",
            hour: "Tunti",
            minute: "Minuutti"
        },
        cat: {
            selected: "Seleccionats:",
            day: "Dia",
            days: "Dies",
            apply: "Tanca",
            "week-1": "Dl",
            "week-2": "Dm",
            "week-3": "Dc",
            "week-4": "Dj",
            "week-5": "Dv",
            "week-6": "Ds",
            "week-7": "Dg",
            "week-number": "S",
            "month-name": "gener febrer mar\u00e7 abril maig juny juliol agost setembre octubre novembre desembre".split(" "),
            shortcuts: "Dre\u00e7eres",
            "custom-values": "Valors personalitzats",
            past: "Passat",
            following: "Futur",
            previous: "Anterior",
            "prev-week": "Setmana",
            "prev-month": "Mes",
            "prev-year": "Any",
            next: "Seg\u00fcent",
            "next-week": "Setmana",
            "next-month": "Mes",
            "next-year": "Any",
            "less-than": "El per\u00edode no hauria de ser de m\u00e9s de %d dies",
            "more-than": "El per\u00edode no hauria de ser de menys de %d dies",
            "default-more": "Perfavor selecciona un per\u00edode m\u00e9s gran de %d dies",
            "default-single": "Perfavor selecciona una data",
            "default-less": "Perfavor selecciona un per\u00edode de menys de %d dies",
            "default-range": "Perfavor selecciona un per\u00edode d'entre %d i %d dies",
            "default-default": "Perfavor selecciona un per\u00edode",
            time: "Temps",
            hour: "Hora",
            minute: "Minut"
        }
    };
    f.fn.dateRangePicker = function(a) {
        function E() {
            if (!a.inline) {
                var b =
                    f(l).offset();
                if ("relative" == f(a.container).css("position")) {
                    var c = f(a.container).offset(),
                        e = Math.max(0, b.left + d.outerWidth() - f("body").width() + 16);
                    d.css({
                        top: b.top - c.top + f(l).outerHeight() + 4,
                        left: b.left - c.left - e
                    })
                } else 460 > b.left ? d.css({
                    top: b.top + f(l).outerHeight() + parseInt(f("body").css("border-top") || 0, 10),
                    left: b.left
                }) : d.css({
                    top: b.top + f(l).outerHeight() + parseInt(f("body").css("border-top") || 0, 10),
                    left: b.left + f(l).width() - d.width() - 16
                })
            }
        }

        function K(b) {
            S();
            L();
            a.customOpenAnimation ? a.customOpenAnimation.call(d.get(0),
                function() {
                    f(l).trigger("datepicker-opened", {
                        relatedTarget: d
                    })
                }) : d.slideDown(b, function() {
                f(l).trigger("datepicker-opened", {
                    relatedTarget: d
                })
            });
            f(l).trigger("datepicker-open", {
                relatedTarget: d
            });
            v();
            T();
            E()
        }

        function L() {
            var b = a.getValue.call(C);
            if ((b = b ? b.split(a.separator) : "") && (1 == b.length && a.singleDate || 2 <= b.length)) {
                var c = a.format;
                c.match(/Do/) && (c = c.replace(/Do/, "D"), b[0] = b[0].replace(/(\d+)(th|nd|st)/, "$1"), 2 <= b.length && (b[1] = b[1].replace(/(\d+)(th|nd|st)/, "$1")));
                y = !1;
                2 <= b.length ? F(M(b[0], c,
                    e.locale(a.language)), M(b[1], c, e.locale(a.language))) : 1 == b.length && a.singleDate && U(M(b[0], c, e.locale(a.language)));
                y = !0
            }
        }

        function M(a, c, d) {
            return e(a, c, d).isValid() ? e(a, c, d).toDate() : e().toDate()
        }

        function T() {
            var a = d.find(".gap").css("margin-left");
            a && (a = parseInt(a));
            var c = d.find(".month1").width();
            a = d.find(".gap").width() + (a ? 2 * a : 0);
            var e = d.find(".month2").width();
            d.find(".month-wrapper").width(c + a + e)
        }

        function B(a, c) {
            d.find("." + a + " input[type=range].hour-range").val(e(c).hours());
            d.find("." + a + " input[type=range].minute-range").val(e(c).minutes());
            N(a, e(c).format("HH"), e(c).format("mm"))
        }

        function O(b, c) {
            a[b] = parseInt(e(parseInt(c)).startOf("day").add(e(a[b + "Time"]).format("HH"), "h").add(e(a[b + "Time"]).format("mm"), "m").valueOf())
        }

        function N(b, c, f) {
            function g(b, g) {
                var m = g.format("HH"),
                    e = g.format("mm");
                a[b] = g.startOf("day").add(c || m, "h").add(f || e, "m").valueOf()
            }
            c && d.find("." + b + " .hour-val").text(c);
            f && d.find("." + b + " .minute-val").text(f);
            switch (b) {
                case "time1":
                    a.start && g("start", e(a.start));
                    g("startTime", e(a.startTime || e().valueOf()));
                    break;
                case "time2":
                    a.end && g("end", e(a.end)), g("endTime", e(a.endTime || e().valueOf()))
            }
            z();
            A();
            w()
        }

        function W(b) {
            var c = b;
            "week-range" === a.batchMode ? c = "monday" === a.startOfWeek ? e(parseInt(b)).startOf("isoweek").valueOf() : e(parseInt(b)).startOf("week").valueOf() : "month-range" === a.batchMode && (c = e(parseInt(b)).startOf("month").valueOf());
            return c
        }

        function X(b) {
            var c = b;
            "week-range" === a.batchMode ? c = "monday" === a.startOfWeek ? e(parseInt(b)).endOf("isoweek").valueOf() : e(parseInt(b)).endOf("week").valueOf() : "month-range" ===
                a.batchMode && (c = e(parseInt(b)).endOf("month").valueOf());
            return c
        }

        function P(b) {
            b = parseInt(b, 10);
            if (a.startDate && 0 > n(b, a.startDate) || a.endDate && 0 < n(b, a.endDate)) return !1;
            if (a.start && !a.end && !a.singleDate) {
                if (0 < a.maxDays && D(b, a.start) > a.maxDays || 0 < a.minDays && D(b, a.start) < a.minDays || a.selectForward && b < a.start || a.selectBackward && b > a.start) return !1;
                if (a.beforeShowDay && "function" == typeof a.beforeShowDay) {
                    for (var c = !0; 1 < D(b, a.start);) {
                        if (!a.beforeShowDay(new Date(b))[0]) {
                            c = !1;
                            break
                        }
                        if (864E5 > Math.abs(b -
                                a.start)) break;
                        b > a.start && (b -= 864E5);
                        b < a.start && (b += 864E5)
                    }
                    if (!c) return !1
                }
            }
            return !0
        }

        function Q() {
            d.find(".day.invalid.tmp").removeClass("tmp invalid").addClass("valid");
            a.start && !a.end && d.find(".day.toMonth.valid").each(function() {
                var a = parseInt(f(this).attr("time"), 10);
                P(a) ? f(this).addClass("valid tmp").removeClass("invalid") : f(this).addClass("invalid tmp").removeClass("valid")
            });
            return !0
        }

        function Y(b) {
            var c = parseInt(b.attr("time")),
                e = "";
            if (b.hasClass("has-tooltip") && b.attr("data-tooltip")) e = '<span class="tooltip-content">' +
                b.attr("data-tooltip") + "</span>";
            else if (!b.hasClass("invalid"))
                if (a.singleDate) d.find(".day.hovering").removeClass("hovering"), b.addClass("hovering");
                else if (d.find(".day").each(function() {
                    var b = parseInt(f(this).attr("time"));
                    b == c ? f(this).addClass("hovering") : f(this).removeClass("hovering");
                    a.start && !a.end && (a.start < b && c >= b || a.start > b && c <= b) ? f(this).addClass("hovering") : f(this).removeClass("hovering")
                }), a.start && !a.end) {
                var g = D(c, a.start);
                a.hoveringTooltip && ("function" == typeof a.hoveringTooltip ?
                    e = a.hoveringTooltip(g, a.start, c) : !0 === a.hoveringTooltip && 1 < g && (e = g + " " + h("days")))
            }
            if (e) {
                g = b.offset();
                var m = d.offset(),
                    r = g.left - m.left,
                    V = g.top - m.top;
                r += b.width() / 2;
                var k = d.find(".date-range-length-tip");
                b = k.css({
                    visibility: "hidden",
                    display: "none"
                }).html(e).width();
                e = k.height();
                r -= b / 2;
                V -= e;
                setTimeout(function() {
                    k.css({
                        left: r,
                        top: V,
                        display: "block",
                        visibility: "visible"
                    })
                }, 10)
            } else d.find(".date-range-length-tip").hide()
        }

        function Z() {
            d.find(".day.hovering").removeClass("hovering");
            d.find(".date-range-length-tip").hide()
        }

        function aa(b) {
            var c = b.val(),
                d = b.attr("name");
            b = b.parents("table").hasClass("month1") ? "month1" : "month2";
            var g = "month1" === b ? "month2" : "month1",
                m = a.startDate ? e(a.startDate) : !1,
                f = a.endDate ? e(a.endDate) : !1;
            c = e(a[b])[d](c);
            m && c.isSameOrBefore(m) && (c = m.add("month2" === b ? 1 : 0, "month"));
            f && c.isSameOrAfter(f) && (c = f.add(a.singleMonth || "month1" !== b ? 0 : -1, "month"));
            k(c, b);
            "month1" === b ? (a.stickyMonths || e(c).isSameOrAfter(a[g], "month")) && k(e(c).add(1, "month"), g) : (a.stickyMonths || e(c).isSameOrBefore(a[g], "month")) &&
                k(e(c).add(-1, "month"), g);
            v()
        }

        function G() {
            !0 === a.singleDate ? y && a.start && a.autoClose && x() : y && a.start && a.end && a.autoClose && x()
        }

        function z() {
            var b = Math.ceil((a.end - a.start) / 864E5) + 1;
            a.singleDate ? a.start && !a.end ? d.find(".drp_top-bar").removeClass("error").addClass("normal") : d.find(".drp_top-bar").removeClass("error").removeClass("normal") : a.maxDays && b > a.maxDays ? (a.start = !1, a.end = !1, d.find(".day").removeClass("checked"), d.find(".drp_top-bar").removeClass("normal").addClass("error").find(".error-top").html(h("less-than").replace("%d",
                a.maxDays))) : a.minDays && b < a.minDays ? (a.start = !1, a.end = !1, d.find(".day").removeClass("checked"), d.find(".drp_top-bar").removeClass("normal").addClass("error").find(".error-top").html(h("more-than").replace("%d", a.minDays))) : a.start || a.end ? d.find(".drp_top-bar").removeClass("error").addClass("normal") : d.find(".drp_top-bar").removeClass("error").removeClass("normal");
            a.singleDate && a.start && !a.end || !a.singleDate && a.start && a.end ? d.find(".apply-btn").removeClass("disabled") : d.find(".apply-btn").addClass("disabled");
            a.batchMode && (a.start && a.startDate && 0 > n(a.start, a.startDate) || a.end && a.endDate && 0 < n(a.end, a.endDate)) && (a.start = !1, a.end = !1, d.find(".day").removeClass("checked"))
        }

        function A(b, c) {
            d.find(".start-day").html("...");
            d.find(".end-day").html("...");
            d.find(".selected-days").hide();
            a.start && d.find(".start-day").html(t(new Date(parseInt(a.start))));
            a.end && d.find(".end-day").html(t(new Date(parseInt(a.end))));
            a.start && a.singleDate ? (d.find(".apply-btn").removeClass("disabled"), b = t(new Date(a.start)), a.setValue.call(C,
                    b, t(new Date(a.start)), t(new Date(a.end))), y && !c && f(l).trigger("datepicker-change", {
                    value: b,
                    date1: new Date(a.start)
                })) : a.start && a.end ? (d.find(".selected-days").show().find(".selected-days-num").html(D(a.end, a.start)), d.find(".apply-btn").removeClass("disabled"), b = t(new Date(a.start)) + a.separator + t(new Date(a.end)), a.setValue.call(C, b, t(new Date(a.start)), t(new Date(a.end))), y && !c && f(l).trigger("datepicker-change", {
                    value: b,
                    date1: new Date(a.start),
                    date2: new Date(a.end)
                })) : b ? d.find(".apply-btn").removeClass("disabled") :
                d.find(".apply-btn").addClass("disabled")
        }

        function D(a, c) {
            return Math.abs(Math.floor(ba(a) / 864E5) - Math.floor(ba(c) / 864E5)) + 1
        }

        function F(b, c, e) {
            if (b.getTime() > c.getTime()) {
                var g = c;
                c = b;
                b = g
            }
            g = !0;
            a.startDate && 0 > n(b, a.startDate) && (g = !1);
            a.endDate && 0 < n(c, a.endDate) && (g = !1);
            if (g) {
                a.start = b.getTime();
                a.end = c.getTime();
                a.time.enabled && (B("time1", b), B("time2", c));
                if (a.stickyMonths || 0 < n(b, c) && 0 === p(b, c)) a.lookBehind ? b = u(c) : c = q(b);
                a.stickyMonths && !1 !== a.endDate && 0 < p(c, a.endDate) && (b = u(b), c = u(c));
                a.stickyMonths ||
                    0 === p(b, c) && (a.lookBehind ? b = u(c) : c = q(b));
                k(b, "month1");
                k(c, "month2");
                v();
                z();
                A(!1, e);
                G()
            } else k(a.startDate, "month1"), k(q(a.startDate), "month2"), v()
        }

        function U(b) {
            var c = !0;
            a.startDate && 0 > n(b, a.startDate) && (c = !1);
            a.endDate && 0 < n(b, a.endDate) && (c = !1);
            c ? (a.start = b.getTime(), a.time.enabled && B("time1", b), k(b, "month1"), !0 !== a.singleMonth && (b = q(b), k(b, "month2")), v(), A(), G()) : k(a.startDate, "month1")
        }

        function w() {
            if (a.start || a.end) d.find(".day").each(function() {
                var b = parseInt(f(this).attr("time")),
                    c = a.start,
                    d = a.end;
                a.time.enabled && (b = e(b).startOf("day").valueOf(), c = e(c || e().valueOf()).startOf("day").valueOf(), d = e(d || e().valueOf()).startOf("day").valueOf());
                a.start && a.end && d >= b && c <= b || a.start && !a.end && e(c).format("YYYY-MM-DD") == e(b).format("YYYY-MM-DD") ? f(this).addClass("checked") : f(this).removeClass("checked");
                a.start && e(c).format("YYYY-MM-DD") == e(b).format("YYYY-MM-DD") ? f(this).addClass("first-date-selected") : f(this).removeClass("first-date-selected");
                a.end && e(d).format("YYYY-MM-DD") == e(b).format("YYYY-MM-DD") ?
                    f(this).addClass("last-date-selected") : f(this).removeClass("last-date-selected")
            }), d.find(".week-number").each(function() {
                f(this).attr("data-start-time") == a.startWeek && f(this).addClass("week-number-selected")
            })
        }

        function k(b, c) {
            b = e(b).toDate();
            var f = ka(b, c);
            var g = e(b);
            var m = a.startDate ? e(a.startDate).add(a.singleMonth || "month2" !== c ? 0 : 1, "month") : !1;
            var r = a.endDate ? e(a.endDate).add(a.singleMonth || "month1" !== c ? 0 : -1, "month") : !1;
            g = g.get("year");
            var h = a.yearSelect && "function" === typeof a.yearSelect;
            !a.yearSelect ||
                m && r && m.isSame(e(r), "year") ? m = '<div class="month-element">' + g + "</div>" : (h = h ? a.yearSelect(g) : a.yearSelect.slice(), h = [m ? Math.max(h[0], m.get("year")) : Math.min(h[0], g), r ? Math.min(h[1], r.get("year")) : Math.max(h[1], g)], m = ca("year", da(h, g)));
            d.find("." + c + " .month-name").html(f + " " + m);
            d.find("." + c + " tbody").html(la(b));
            a[c] = b;
            Q();
            ma()
        }

        function ka(b, c) {
            var d = a.startDate ? e(a.startDate).add(a.singleMonth || "month2" !== c ? 0 : 1, "month") : !1;
            c = a.endDate ? e(a.endDate).add(a.singleMonth || "month1" !== c ? 0 : -1, "month") : !1;
            b = e(b);
            if (!a.monthSelect || d && c && d.isSame(c, "month")) return '<div class="month-element">' + R(b.get("month")) + "</div>";
            d = [d && b.isSame(d, "year") ? d.get("month") : 0, c && b.isSame(c, "year") ? c.get("month") : 11];
            return d[0] === d[1] ? '<div class="month-element">' + R(b.get("month")) + "</div>" : ca("month", da(d, b.get("month"), function(a) {
                return R(a)
            }))
        }

        function da(a, c, d) {
            var b = [];
            d = d || function(a) {
                return a
            };
            for (var e = a[0]; e <= a[1]; e++) b.push({
                value: e,
                text: d(e),
                isCurrent: e === c
            });
            return b
        }

        function ca(a, c) {
            a = '<div class="select-wrapper"><select class="' +
                a + '" name="' + a + '">';
            for (var b, g = 0, d = c.length; g < d; g++) a += '<option value="' + c[g].value + '"' + (c[g].isCurrent ? " selected" : "") + ">", a += c[g].text, a += "</option>", c[g].isCurrent && (b = c[g].text);
            return a + ("</select>" + b + "</div>")
        }

        function ma() {
            d.find(".day").unbind("click").click(function(b) {
                b = f(this);
                if (!b.hasClass("invalid")) {
                    var c = b.attr("time");
                    b.addClass("checked");
                    a.singleDate ? (a.start = c, a.end = !1) : "week" === a.batchMode ? "monday" === a.startOfWeek ? (a.start = e(parseInt(c)).startOf("isoweek").valueOf(), a.end = e(parseInt(c)).endOf("isoweek").valueOf()) :
                        (a.end = e(parseInt(c)).endOf("week").valueOf(), a.start = e(parseInt(c)).startOf("week").valueOf()) : "workweek" === a.batchMode ? (a.start = e(parseInt(c)).day(1).valueOf(), a.end = e(parseInt(c)).day(5).valueOf()) : "weekend" === a.batchMode ? (a.start = e(parseInt(c)).day(6).valueOf(), a.end = e(parseInt(c)).day(7).valueOf()) : "month" === a.batchMode ? (a.start = e(parseInt(c)).startOf("month").valueOf(), a.end = e(parseInt(c)).endOf("month").valueOf()) : a.start && a.end || !a.start && !a.end ? (a.start = W(c), a.end = !1) : a.start && (a.end = X(c),
                            a.time.enabled && O("end", a.end));
                    a.time.enabled && (a.start && O("start", a.start), a.end && O("end", a.end));
                    if (!a.singleDate && a.start && a.end && a.start > a.end) {
                        var d = a.end;
                        a.end = X(a.start);
                        a.start = W(d);
                        a.time.enabled && a.swapTime && (B("time1", a.start), B("time2", a.end))
                    }
                    a.start = parseInt(a.start);
                    a.end = parseInt(a.end);
                    Z();
                    a.start && !a.end && (f(l).trigger("datepicker-first-date-selected", {
                        date1: new Date(a.start)
                    }), Y(b));
                    Q(c);
                    z();
                    A();
                    w();
                    G()
                }
            });
            d.find(".day").unbind("mouseenter").mouseenter(function(a) {
                Y(f(this))
            });
            d.find(".day").unbind("mouseleave").mouseleave(function(b) {
                d.find(".date-range-length-tip").hide();
                a.singleDate && Z()
            });
            d.find(".week-number").unbind("click").click(function(b) {
                var c = f(this);
                b = parseInt(c.attr("data-start-time"), 10);
                a.startWeek ? (d.find(".week-number-selected").removeClass("week-number-selected"), c = new Date(b < a.startWeek ? b : a.startWeek), b = new Date(b < a.startWeek ? a.startWeek : b), a.startWeek = !1, a.start = e(c).day("monday" == a.startOfWeek ? 1 : 0).valueOf(), a.end = e(b).day("monday" == a.startOfWeek ?
                    7 : 6).valueOf()) : (a.startWeek = b, c.addClass("week-number-selected"), c = new Date(b), a.start = e(c).day("monday" == a.startOfWeek ? 1 : 0).valueOf(), a.end = e(c).day("monday" == a.startOfWeek ? 7 : 6).valueOf());
                Q();
                z();
                A();
                w();
                G()
            });
            d.find(".month").unbind("change").change(function(a) {
                aa(f(this))
            });
            d.find(".year").unbind("change").change(function(a) {
                aa(f(this))
            })
        }

        function H(a, c) {
            d.find("." + c).append("<div><span>" + h("Time") + ': <span class="hour-val">00</span>:<span class="minute-val">00</span></span></div><div class="hour"><label>' +
                h("Hour") + ': <input type="range" class="hour-range" name="hour" min="0" max="23"></label></div><div class="minute"><label>' + h("Minute") + ': <input type="range" class="minute-range" name="minute" min="0" max="59"></label></div>');
            B(c, a)
        }

        function R(a) {
            return h("month-name")[a]
        }

        function t(b) {
            return e(b).format(a.format)
        }

        function v() {
            w();
            var b = parseInt(e(a.month1).format("YYYYMM")),
                c = parseInt(e(a.month2).format("YYYYMM"));
            b = Math.abs(b - c);
            1 < b && 89 != b ? d.addClass("has-gap").removeClass("no-gap").find(".gap").css("visibility",
                "visible") : d.removeClass("has-gap").addClass("no-gap").find(".gap").css("visibility", "hidden");
            b = d.find("table.month1").height();
            c = d.find("table.month2").height();
            d.find(".gap").height(Math.max(b, c) + 10)
        }

        function x() {
            if (!a.alwaysOpen) {
                var b = function() {
                    f(l).data("date-picker-opened", !1);
                    f(l).trigger("datepicker-closed", {
                        relatedTarget: d
                    })
                };
                a.customCloseAnimation ? a.customCloseAnimation.call(d.get(0), b) : f(d).slideUp(a.duration, b);
                f(l).trigger("datepicker-close", {
                    relatedTarget: d
                })
            }
        }

        function S() {
            k(a.month1,
                "month1");
            k(a.month2, "month2")
        }

        function p(a, c) {
            a = parseInt(e(a).format("YYYYMM")) - parseInt(e(c).format("YYYYMM"));
            return 0 < a ? 1 : 0 === a ? 0 : -1
        }

        function n(a, c) {
            a = parseInt(e(a).format("YYYYMMDD")) - parseInt(e(c).format("YYYYMMDD"));
            return 0 < a ? 1 : 0 === a ? 0 : -1
        }

        function q(a) {
            return e(a).add(1, "months").toDate()
        }

        function u(a) {
            return e(a).add(-1, "months").toDate()
        }

        function na() {
            var b = '<div class="date-picker-wrapper';
            a.extraClass && (b += " " + a.extraClass + " ");
            a.singleDate && (b += " single-date ");
            a.showShortcuts || (b += " no-shortcuts ");
            a.showTopbar || (b += " no-topbar ");
            a.customTopBar && (b += " custom-topbar ");
            b += '">';
            if (a.showTopbar) {
                b += '<div class="drp_top-bar">';
                a.customTopBar ? ("function" == typeof a.customTopBar && (a.customTopBar = a.customTopBar()), b += '<div class="custom-top">' + a.customTopBar + "</div>") : (b += '<div class="normal-top"><span class="selection-top">' + h("selected") + ' </span> <b class="start-day">...</b>', a.singleDate || (b += ' <span class="separator-day">' + a.separator + '</span> <b class="end-day">...</b> <i class="selected-days">(<span class="selected-days-num">3</span> ' +
                    h("days") + ")</i>"), b += '</div><div class="error-top">error</div><div class="default-top">default</div>');
                var c = "";
                !0 === a.autoClose && (c += " hide");
                "" !== a.applyBtnClass && (c += " " + a.applyBtnClass);
                b += '<input type="button" class="apply-btn disabled' + c + '" value="' + h("apply") + '" />';
                b += "</div>"
            }
            c = a.showWeekNumbers ? 6 : 5;
            var d = "&lt;";
            a.customArrowPrevSymbol && (d = a.customArrowPrevSymbol);
            var g = "&gt;";
            a.customArrowNextSymbol && (g = a.customArrowNextSymbol);
            b += '<div class="month-wrapper">   <table class="month1" cellspacing="0" border="0" cellpadding="0">       <thead>           <tr class="caption">               <th>                   <span class="prev">' +
                d + '                   </span>               </th>               <th colspan="' + c + '" class="month-name">               </th>               <th>' + (a.singleDate || !a.stickyMonths ? '<span class="next">' + g + "</span>" : "") + '               </th>           </tr>           <tr class="week-name">' + ea() + "       </thead>       <tbody></tbody>   </table>";
            if (!a.singleMonth) {
                var e = ['<div class="gap-top-mask"></div><div class="gap-bottom-mask"></div><div class="gap-lines">'];
                for (var r = 0; 20 > r; r++) e.push('<div class="gap-line"><div class="gap-1"></div><div class="gap-2"></div><div class="gap-3"></div></div>');
                e.push("</div>");
                e = e.join("");
                b += '<div class="gap">' + e + '</div><table class="month2" cellspacing="0" border="0" cellpadding="0">   <thead>   <tr class="caption">       <th>' + (a.stickyMonths ? "" : '<span class="prev">' + d + "</span>") + '       </th>       <th colspan="' + c + '" class="month-name">       </th>       <th>           <span class="next">' + g + '</span>       </th>   </tr>   <tr class="week-name">' + ea() + "   </thead>   <tbody></tbody></table>"
            }
            b += '<div class="dp-clearfix"></div><div class="time"><div class="time1"></div>';
            a.singleDate || (b += '<div class="time2"></div>');
            b += '</div><div class="dp-clearfix"></div></div><div class="footer">';
            if (a.showShortcuts) {
                b += '<div class="shortcuts"><b>' + h("shortcuts") + "</b>";
                if (d = a.shortcuts) {
                    if (d["prev-days"] && 0 < d["prev-days"].length) {
                        b += '&nbsp;<span class="prev-days">' + h("past");
                        for (c = 0; c < d["prev-days"].length; c++) g = d["prev-days"][c], g += 1 < d["prev-days"][c] ? h("days") : h("day"), b += ' <a href="javascript:;" shortcut="day,-' + d["prev-days"][c] + '">' + g + "</a>";
                        b += "</span>"
                    }
                    if (d["next-days"] &&
                        0 < d["next-days"].length) {
                        b += '&nbsp;<span class="next-days">' + h("following");
                        for (c = 0; c < d["next-days"].length; c++) g = d["next-days"][c], g += 1 < d["next-days"][c] ? h("days") : h("day"), b += ' <a href="javascript:;" shortcut="day,' + d["next-days"][c] + '">' + g + "</a>";
                        b += "</span>"
                    }
                    if (d.prev && 0 < d.prev.length) {
                        b += '&nbsp;<span class="prev-buttons">' + h("previous");
                        for (c = 0; c < d.prev.length; c++) g = h("prev-" + d.prev[c]), b += ' <a href="javascript:;" shortcut="prev,' + d.prev[c] + '">' + g + "</a>";
                        b += "</span>"
                    }
                    if (d.next && 0 < d.next.length) {
                        b +=
                            '&nbsp;<span class="next-buttons">' + h("next");
                        for (c = 0; c < d.next.length; c++) g = h("next-" + d.next[c]), b += ' <a href="javascript:;" shortcut="next,' + d.next[c] + '">' + g + "</a>";
                        b += "</span>"
                    }
                }
                if (a.customShortcuts)
                    for (c = 0; c < a.customShortcuts.length; c++) b += '&nbsp;<span class="custom-shortcut"><a href="javascript:;" shortcut="custom">' + a.customShortcuts[c].name + "</a></span>";
                b += "</div>"
            }
            if (a.showCustomValues && (b += '<div class="customValues"><b>' + (a.customValueLabel || h("custom-values")) + "</b>", a.customValues))
                for (c =
                    0; c < a.customValues.length; c++) d = a.customValues[c], b += '&nbsp;<span class="custom-value"><a href="javascript:;" custom="' + d.value + '">' + d.name + "</a></span>";
            return f(b + "</div></div>")
        }

        function ea() {
            var b = a.showWeekNumbers ? "<th>" + h("week-number") + "</th>" : "";
            return "monday" == a.startOfWeek ? b + "<th>" + h("week-1") + "</th><th>" + h("week-2") + "</th><th>" + h("week-3") + "</th><th>" + h("week-4") + "</th><th>" + h("week-5") + "</th><th>" + h("week-6") + "</th><th>" + h("week-7") + "</th>" : b + "<th>" + h("week-7") + "</th><th>" + h("week-1") +
                "</th><th>" + h("week-2") + "</th><th>" + h("week-3") + "</th><th>" + h("week-4") + "</th><th>" + h("week-5") + "</th><th>" + h("week-6") + "</th>"
        }

        function I(b) {
            b = e(b);
            return a.startDate && b.endOf("month").isBefore(a.startDate) || a.endDate && b.startOf("month").isAfter(a.endDate) ? !0 : !1
        }

        function fa(a, c, d) {
            var b = f.extend(!0, {}, a);
            f.each(c, function(a, c) {
                a = c(d);
                for (var g in a) b.hasOwnProperty(g) ? b[g] += a[g] : b[g] = a[g]
            });
            a = "";
            for (var e in b) b.hasOwnProperty(e) && (a += e + '="' + b[e] + '" ');
            return a
        }

        function ba(b) {
            e.isMoment(b) && (b = b.toDate().getTime());
            "object" == typeof b && b.getTime && (b = b.getTime());
            "string" != typeof b || b.match(/\d{13}/) || (b = e(b, a.format).toDate().getTime());
            return b = parseInt(b, 10) - 6E4 * (new Date).getTimezoneOffset()
        }

        function la(b) {
            var c = [];
            b.setDate(1);
            b.getTime();
            var d = new Date,
                g = b.getDay();
            0 === g && "monday" === a.startOfWeek && (g = 7);
            if (0 < g)
                for (var f = g; 0 < f; f--) {
                    var h = new Date(b.getTime() - 864E5 * f);
                    var k = P(h.getTime());
                    a.startDate && 0 > n(h, a.startDate) && (k = !1);
                    a.endDate && 0 < n(h, a.endDate) && (k = !1);
                    c.push({
                        date: h,
                        type: "lastMonth",
                        day: h.getDate(),
                        time: h.getTime(),
                        valid: k
                    })
                }
            h = b.getMonth();
            for (f = 0; 40 > f; f++) g = e(b).add(f, "days").toDate(), k = P(g.getTime()), a.startDate && 0 > n(g, a.startDate) && (k = !1), a.endDate && 0 < n(g, a.endDate) && (k = !1), c.push({
                date: g,
                type: g.getMonth() == h ? "toMonth" : "nextMonth",
                day: g.getDate(),
                time: g.getTime(),
                valid: k
            });
            b = [];
            for (k = 0; 6 > k && "nextMonth" != c[7 * k].type; k++) {
                b.push("<tr>");
                for (h = 0; 7 > h; h++) {
                    g = c[7 * k + ("monday" == a.startOfWeek ? h + 1 : h)];
                    f = e(g.time).format("L") == e(d).format("L");
                    g.extraClass = "";
                    g.tooltip = "";
                    if (g.valid && a.beforeShowDay &&
                        "function" == typeof a.beforeShowDay) {
                        var l = a.beforeShowDay(e(g.time).toDate());
                        g.valid = l[0];
                        g.extraClass = l[1] || "";
                        g.tooltip = l[2] || "";
                        "" !== g.tooltip && (g.extraClass += " has-tooltip ")
                    }
                    f = {
                        time: g.time,
                        "data-tooltip": g.tooltip,
                        "class": "day " + g.type + " " + g.extraClass + " " + (g.valid ? "valid" : "invalid") + " " + (f ? "real-today" : "")
                    };
                    0 === h && a.showWeekNumbers && b.push('<td><div class="week-number" data-start-time="' + g.time + '">' + a.getWeekNumber(g.date) + "</div></td>");
                    b.push("<td " + fa({}, a.dayTdAttrs, g) + "><div " + fa(f, a.dayDivAttrs,
                        g) + ">" + oa(g.time, g.day) + "</div></td>")
                }
                b.push("</tr>")
            }
            return b.join("")
        }

        function oa(b, c) {
            return a.showDateFilter && "function" == typeof a.showDateFilter ? a.showDateFilter(b, c) : c
        }

        function h(a) {
            var b = a.toLowerCase(),
                d = a in J ? J[a] : b in J ? J[b] : null,
                g = f.dateRangePickerLanguages["default"];
            null == d && (d = a in g ? g[a] : b in g ? g[b] : "");
            return d
        }

        function ha() {
            var b = a.defaultTime ? a.defaultTime : new Date;
            a.lookBehind ? (a.startDate && 0 > p(b, a.startDate) && (b = q(e(a.startDate).toDate())), a.endDate && 0 < p(b, a.endDate) && (b = e(a.endDate).toDate())) :
                (a.startDate && 0 > p(b, a.startDate) && (b = e(a.startDate).toDate()), a.endDate && 0 < p(q(b), a.endDate) && (b = u(e(a.endDate).toDate())));
            a.singleDate && (a.startDate && 0 > p(b, a.startDate) && (b = e(a.startDate).toDate()), a.endDate && 0 < p(b, a.endDate) && (b = e(a.endDate).toDate()));
            return b
        }

        function ia(b) {
            b || (b = ha());
            a.lookBehind ? (k(u(b), "month1"), k(b, "month2")) : (k(b, "month1"), k(q(b), "month2"));
            a.singleDate && k(b, "month1");
            w();
            v()
        }
        a || (a = {});
        a = f.extend(!0, {
            autoClose: !1,
            format: "YYYY-MM-DD",
            separator: " to ",
            language: "auto",
            startOfWeek: "sunday",
            getValue: function() {
                return f(this).val()
            },
            setValue: function(a) {
                f(this).attr("readonly") || f(this).is(":disabled") || a == f(this).val() || f(this).val(a)
            },
            startDate: !1,
            endDate: !1,
            time: {
                enabled: !1
            },
            minDays: 0,
            maxDays: 0,
            showShortcuts: !1,
            shortcuts: {},
            customShortcuts: [],
            inline: !1,
            container: "body",
            alwaysOpen: !1,
            singleDate: !1,
            lookBehind: !1,
            batchMode: !1,
            duration: 200,
            stickyMonths: !1,
            dayDivAttrs: [],
            dayTdAttrs: [],
            selectForward: !1,
            selectBackward: !1,
            applyBtnClass: "",
            singleMonth: "auto",
            hoveringTooltip: function(a, c, d) {
                return 1 <
                    a ? a + " " + h("days") : ""
            },
            showTopbar: !0,
            swapTime: !1,
            showWeekNumbers: !1,
            getWeekNumber: function(a) {
                return e(a).format("w")
            },
            customOpenAnimation: null,
            customCloseAnimation: null,
            customArrowPrevSymbol: null,
            customArrowNextSymbol: null,
            monthSelect: !1,
            yearSelect: !1
        }, a);
        a.start = !1;
        a.end = !1;
        a.startWeek = !1;
        a.isTouchDevice = "ontouchstart" in window || navigator.msMaxTouchPoints;
        a.isTouchDevice && (a.hoveringTooltip = !1);
        "auto" == a.singleMonth && (a.singleMonth = 480 > f(window).width());
        a.singleMonth && (a.stickyMonths = !1);
        a.showTopbar ||
            (a.autoClose = !0);
        a.startDate && "string" == typeof a.startDate && (a.startDate = e(a.startDate, a.format).toDate());
        a.endDate && "string" == typeof a.endDate && (a.endDate = e(a.endDate, a.format).toDate());
        a.yearSelect && "boolean" === typeof a.yearSelect && (a.yearSelect = function(a) {
            return [a - 5, a + 5]
        });
        var J = function() {
                if ("auto" == a.language) {
                    var b = navigator.language ? navigator.language : navigator.browserLanguage;
                    if (!b) return f.dateRangePickerLanguages["default"];
                    b = b.toLowerCase();
                    return b in f.dateRangePickerLanguages ? f.dateRangePickerLanguages[b] :
                        f.dateRangePickerLanguages["default"]
                }
                return a.language && a.language in f.dateRangePickerLanguages ? f.dateRangePickerLanguages[a.language] : f.dateRangePickerLanguages["default"]
            }(),
            d, y = !1,
            l = this,
            C = f(l).get(0),
            ja;
        f(this).unbind(".datepicker").bind("click.datepicker", function(b) {
            d.is(":visible") || K(a.duration)
        }).bind("change.datepicker", function(a) {
            L()
        }).bind("keyup.datepicker", function() {
            try {
                clearTimeout(ja)
            } catch (b) {}
            ja = setTimeout(function() {
                L()
            }, 2E3)
        });
        (function() {
            var b = this;
            if (f(this).data("date-picker-opened")) x();
            else {
                f(this).data("date-picker-opened", !0);
                d = na().hide();
                d.append('<div class="date-range-length-tip"></div>');
                f(a.container).append(d);
                a.inline ? d.addClass("inline-wrapper") : E();
                a.alwaysOpen && d.find(".apply-btn").hide();
                var c = ha();
                ia(c);
                if (a.time.enabled)
                    if (a.startDate && a.endDate || a.start && a.end) H(e(a.start || a.startDate).toDate(), "time1"), H(e(a.end || a.endDate).toDate(), "time2");
                    else {
                        var l = a.defaultEndTime ? a.defaultEndTime : c;
                        H(c, "time1");
                        H(l, "time2")
                    }
                c = "";
                c = a.singleDate ? h("default-single") : a.minDays &&
                    a.maxDays ? h("default-range") : a.minDays ? h("default-more") : a.maxDays ? h("default-less") : h("default-default");
                d.find(".default-top").html(c.replace(/%d/, a.minDays).replace(/%d/, a.maxDays));
                a.singleMonth ? d.addClass("single-month") : d.addClass("two-months");
                setTimeout(function() {
                    T();
                    y = !0
                }, 0);
                d.click(function(a) {
                    a.stopPropagation()
                });
                f(document).bind("click.datepicker", function(a) {
                    var c = b[0];
                    c.contains(a.target) || a.target == c || void 0 != c.childNodes && 0 <= f.inArray(a.target, c.childNodes) || d.is(":visible") && x()
                });
                d.find(".next").click(function() {
                    if (a.stickyMonths) {
                        var b = q(a.month1),
                            c = q(a.month2);
                        I(c) || !a.singleDate && 0 <= p(b, c) || (k(b, "month1"), k(c, "month2"), w())
                    } else c = (b = f(this).parents("table").hasClass("month2")) ? a.month2 : a.month1, c = q(c), !a.singleMonth && !a.singleDate && !b && 0 <= p(c, a.month2) || I(c) || (k(c, b ? "month2" : "month1"), v())
                });
                d.find(".prev").click(function() {
                    if (a.stickyMonths) {
                        var b = u(a.month1),
                            c = u(a.month2);
                        I(b) || !a.singleDate && 0 >= p(c, b) || (k(c, "month2"), k(b, "month1"), w())
                    } else c = (b = f(this).parents("table").hasClass("month2")) ?
                        a.month2 : a.month1, c = u(c), b && 0 >= p(c, a.month1) || I(c) || (k(c, b ? "month2" : "month1"), v())
                });
                d.attr("unselectable", "on").css("user-select", "none").bind("selectstart", function(a) {
                    a.preventDefault();
                    return !1
                });
                d.find(".apply-btn").click(function() {
                    x();
                    var c = t(new Date(a.start)) + a.separator + t(new Date(a.end));
                    f(b).trigger("datepicker-apply", {
                        value: c,
                        date1: new Date(a.start),
                        date2: new Date(a.end)
                    })
                });
                d.find("[custom]").click(function() {
                    var b = f(this).attr("custom");
                    a.start = !1;
                    a.end = !1;
                    d.find(".day.checked").removeClass("checked");
                    a.setValue.call(C, b);
                    z();
                    A(!0);
                    w();
                    a.autoClose && x()
                });
                d.find("[shortcut]").click(function() {
                    var b = f(this).attr("shortcut"),
                        c = new Date,
                        d = !1;
                    if (-1 != b.indexOf("day")) b = parseInt(b.split(",", 2)[1], 10), d = new Date((new Date).getTime() + 864E5 * b), c = new Date(c.getTime() + 864E5 * (0 < b ? 1 : -1));
                    else if (-1 != b.indexOf("week")) {
                        b = -1 != b.indexOf("prev,") ? -1 : 1;
                        d = 1 == b ? "monday" == a.startOfWeek ? 1 : 0 : "monday" == a.startOfWeek ? 0 : 6;
                        for (c = new Date(c.getTime() - 864E5); c.getDay() != d;) c = new Date(c.getTime() + 864E5 * b);
                        d = new Date(c.getTime() +
                            5184E5 * b)
                    } else if (-1 != b.indexOf("month")) b = -1 != b.indexOf("prev,") ? -1 : 1, d = 1 == b ? q(c) : u(c), d.setDate(1), c = q(d), c.setDate(1), c = new Date(c.getTime() - 864E5);
                    else if (-1 != b.indexOf("year")) b = -1 != b.indexOf("prev,") ? -1 : 1, d = new Date, d.setFullYear(c.getFullYear() + b), d.setMonth(0), d.setDate(1), c.setFullYear(c.getFullYear() + b), c.setMonth(11), c.setDate(31);
                    else if ("custom" == b && (b = f(this).html(), a.customShortcuts && 0 < a.customShortcuts.length))
                        for (var e = 0; e < a.customShortcuts.length; e++) {
                            var h = a.customShortcuts[e];
                            if (h.name == b) {
                                (b = h.dates.call()) && 2 == b.length && (d = b[0], c = b[1]);
                                b && 1 == b.length && (b = b[0], k(b, "month1"), k(q(b), "month2"), v());
                                break
                            }
                        }
                    d && c && (F(d, c), z())
                });
                d.find(".time1 input[type=range]").bind("change touchmove", function(a) {
                    var b = a.target;
                    a = "hour" == b.name ? f(b).val().replace(/^(\d{1})$/, "0$1") : void 0;
                    b = "minute" == b.name ? f(b).val().replace(/^(\d{1})$/, "0$1") : void 0;
                    N("time1", a, b)
                });
                d.find(".time2 input[type=range]").bind("change touchmove", function(a) {
                    var b = a.target;
                    a = "hour" == b.name ? f(b).val().replace(/^(\d{1})$/,
                        "0$1") : void 0;
                    b = "minute" == b.name ? f(b).val().replace(/^(\d{1})$/, "0$1") : void 0;
                    N("time2", a, b)
                })
            }
        }).call(this);
        a.alwaysOpen && K(0);
        f(this).data("dateRangePicker", {
            setStart: function(b) {
                "string" == typeof b && (b = e(b, a.format).toDate());
                a.end = !1;
                U(b);
                return this
            },
            setEnd: function(b, c) {
                var d = new Date;
                d.setTime(a.start);
                "string" == typeof b && (b = e(b, a.format).toDate());
                F(d, b, c);
                return this
            },
            setDateRange: function(b, c, d) {
                "string" == typeof b && "string" == typeof c && (b = e(b, a.format).toDate(), c = e(c, a.format).toDate());
                F(b,
                    c, d)
            },
            clear: function() {
                a.start = !1;
                a.end = !1;
                d.find(".day.checked").removeClass("checked");
                d.find(".day.last-date-selected").removeClass("last-date-selected");
                d.find(".day.first-date-selected").removeClass("first-date-selected");
                a.setValue.call(C, "");
                z();
                A();
                w()
            },
            close: x,
            open: K,
            redraw: S,
            getDatePicker: function() {
                return d
            },
            resetMonthsView: ia,
            destroy: function() {
                f(l).unbind(".datepicker");
                f(l).data("dateRangePicker", "");
                f(l).data("date-picker-opened", null);
                d.remove();
                f(window).unbind("resize.datepicker",
                    E);
                f(document).unbind("click.datepicker", x)
            }
        });
        f(window).bind("resize.datepicker", E);
        return this
    }
});