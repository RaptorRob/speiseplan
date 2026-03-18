const fullMenuData = {
    1: {
        "Mittwoch": [
            { id: "w1_mi_a", type: "A", desc: "Spaghetti Bolognese" },
            { id: "w1_mi_b", type: "Hausmannskost", desc: "gebratene Forelle mit Fischkartoffeln" },
            { id: "w1_mi_c", type: "C", desc: "Pellkartoffeln mit Kräuterquark" }
        ],
        "Donnerstag": [
            { id: "w1_do_a", type: "A", desc: "Rührei, Spinat, Kartoffeln" },
            { id: "w1_do_b", type: "Hausmannskost", desc: 'Ofenschnitzel "Toskana", Schupfnudeln' },
            { id: "w1_do_c", type: "C", desc: "Putenspieße, Mexicogemüse, Vollkornreis" }
        ],
        "Freitag": [
            { id: "w1_fr_a", type: "A", desc: "Fischstäbchen, Möhrengemüse, Kartoffelbrei" },
            { id: "w1_fr_b", type: "Hausmannskost", desc: "Eier in Gemüsesauce, Reis" },
            { id: "w1_fr_c", type: "C", desc: "vegetarische Nudelpfanne" }
        ],
        "Samstag": [
            { id: "w1_sa_a", type: "A", desc: "Gemüse-Spätzle-Suppe mit Geflügelfleisch" },
            { id: "w1_sa_b", type: "Hausmannskost", desc: "Erbsensuppe mit Kassler" },
            { id: "w1_sa_c", type: "C", desc: "vegetarische Kohlsuppe" }
        ],
        "Sonntag": [
            { id: "w1_so_a", type: "A", desc: "Hackbraten, Möhren-Mais-Gemüse, Kartoffeln" },
            { id: "w1_so_b", type: "Hausmannskost", desc: "Rindergoulasch, Rotkohl, Kartoffeln" },
            { id: "w1_so_c", type: "C", desc: "Dinkelpfanne mit Pilzen and Gemüse" }
        ],
        "Montag": [
            { id: "w1_mo_a", type: "A", desc: "Hefeklöße mit Fruchtsauce" },
            { id: "w1_mo_b", type: "Hausmannskost", desc: "Cordon bleu vom Huhn, Mischgemüse, Salzkartoffeln" },
            { id: "w1_mo_c", type: "C", desc: "gedünstetes Fischfilet, Juliennegemüse, Dillsauce, Kartoffeln" }
        ],
        "Dienstag": [
            { id: "w1_di_a", type: "A", desc: "kleines Hähnchensteak, Mischgemüse, Kartoffeln" },
            { id: "w1_di_b", type: "Hausmannskost", desc: "Indische Hackbällchen in Currysauce, Fladenbrot" },
            { id: "w1_di_c", type: "C", desc: "Blumenkohl-Gratin" }
        ]
    },
    2: {
        "Mittwoch": [
            { id: "w2_mi_a", type: "A", desc: "gebratenes Fischfilet an Tomatensauce, Erbsen-Mais, Nudeln" },
            { id: "w2_mi_b", type: "Hausmannskost", desc: "Bratwurst, bayrisch Kraut, Salzkartoffeln" },
            { id: "w2_mi_c", type: "C", desc: "Eier-Gemüseragout, Salzkartoffeln" }
        ],
        "Donnerstag": [
            { id: "w2_do_a", type: "A", desc: "Hähnchenbrustfilet, Frischkäsecremesauce, Möhren, Butterreis" },
            { id: "w2_do_b", type: "Hausmannskost", desc: 'Schweineroulade "Florentiner Art", Kartoffeln' },
            { id: "w2_do_c", type: "C", desc: "Asia-Gemüse auf Nudel-Bett" }
        ],
        "Freitag": [
            { id: "w2_fr_a", type: "A", desc: "Eier in Senfsauce, Salzkartoffeln" },
            { id: "w2_fr_b", type: "Hausmannskost", desc: "Fischfilet gebraten auf Dillgurken, Salzkartoffeln" },
            { id: "w2_fr_c", type: "C", desc: "Gemüselasagne" }
        ],
        "Samstag": [
            { id: "w2_sa_a", type: "A", desc: "Reissuppe mit Geflügelfleisch" },
            { id: "w2_sa_b", type: "Hausmannskost", desc: "Linsensuppe mit Kassler" },
            { id: "w2_sa_c", type: "C", desc: "Kartoffel-Kichererbsen-Eintopf mit Paprika" }
        ],
        "Sonntag": [
            { id: "w2_so_a", type: "A", desc: "Hühnerfrikassee mit Reis" },
            { id: "w2_so_b", type: "Hausmannskost", desc: "Rinderroulade mit Buttererbsen, Klöße" },
            { id: "w2_so_c", type: "C", desc: "Reisplätzchen auf Paprikagemüse" }
        ],
        "Montag": [
            { id: "w2_mo_a", type: "A", desc: "Hähnchennuggets, Broccoli, Kartoffeln" },
            { id: "w2_mo_b", type: "Hausmannskost", desc: "Geflügelleber, Zwiebeln, Kartoffeln" },
            { id: "w2_mo_c", type: "C", desc: "Usedomer Fischtopf" }
        ],
        "Dienstag": [
            { id: "w2_di_a", type: "A", desc: "Putengeschnetzeltes mit Spätzle" },
            { id: "w2_di_b", type: "Hausmannskost", desc: 'Chickenwings "mexikanisch", Reis' },
            { id: "w2_di_c", type: "C", desc: "Hirsebratling mit Zucchinigemüse und Feta-Dip" }
        ]
    },
    3: {
        "Mittwoch": [
            { id: "w3_mi_a", type: "A", desc: "Eierkuchen mit Apfelmus" },
            { id: "w3_mi_b", type: "Hausmannskost", desc: "Boulette an Porreerahm, Kartoffeln" },
            { id: "w3_mi_c", type: "C", desc: "vegetarische Paprikaschote gefüllt mit Naturreis" }
        ],
        "Donnerstag": [
            { id: "w3_do_a", type: "A", desc: "gebratene Jagdwurst mit Tomatensauce, Nudeln" },
            { id: "w3_do_b", type: "Hausmannskost", desc: "Lachssteak gebraten auf Blattspinat, Kartoffeln" },
            { id: "w3_do_c", type: "C", desc: "Bunter Gemüseauflauf mit Kräuterdip" }
        ],
        "Freitag": [
            { id: "w3_fr_a", type: "A", desc: "Fischfrikadelle, Erbsen-Mais, Kräutersauce, Reis" },
            { id: "w3_fr_b", type: "Hausmannskost", desc: "Szegediner Gulasch mit Salzkartoffeln" },
            { id: "w3_fr_c", type: "C", desc: "Gemüsebratling, Käsesauce, Kartoffeln" }
        ],
        "Samstag": [
            { id: "w3_sa_a", type: "A", desc: "Kartoffelsuppe mit Wiener Würstchen" },
            { id: "w3_sa_b", type: "Hausmannskost", desc: "Grüner Bohneneintopf mit Rauchfleisch" },
            { id: "w3_sa_c", type: "C", desc: "Frühlingssuppe mit Graupen" }
        ],
        "Sonntag": [
            { id: "w3_so_a", type: "A", desc: "Gemüsedinos, Karotten-Kohlrabi-Gemüse, Kartoffeln" },
            { id: "w3_so_b", type: "Hausmannskost", desc: "Schnitzel mit Karotten-Kohlrabi, Kartoffeln" },
            { id: "w3_so_c", type: "C", desc: "Kabeljau, gebraten auf Ratatouille, Naturreis" }
        ],
        "Montag": [
            { id: "w3_mo_a", type: "A", desc: "Geflügelbratwurst, Gemüse, Kartoffeln" },
            { id: "w3_mo_b", type: "Hausmannskost", desc: "Eier in süß-saurer Sauce, Kartoffeln" },
            { id: "w3_mo_c", type: "C", desc: "Kalbsragout mit Estragon auf Vollkornnudeln" }
        ],
        "Dienstag": [
            { id: "w3_di_a", type: "A", desc: "Makkaroni mit Wurst-Gemüsegulasch" },
            { id: "w3_di_b", type: "Hausmannskost", desc: "Hähnchenbrustfilet in Curry-Mangosauce, Reis" },
            { id: "w3_di_c", type: "C", desc: "Tomaten-Paprika-Zucchini-Gemüse an Vollkornnudeln" }
        ]
    },
    4: {
        "Mittwoch": [
            { id: "w4_mi_a", type: "A", desc: 'Fischroulade "Julienne", Kräutersauce, Reis' },
            { id: "w4_mi_b", type: "Hausmannskost", desc: "Nudelpfanne mit Broccolisauce" },
            { id: "w4_mi_c", type: "C", desc: "Chinakohlfrittata mit Kürbiskernen" }
        ],
        "Donnerstag": [
            { id: "w4_do_a", type: "A", desc: "Nudeln mit Porree-Schinken-Käse-Sauce" },
            { id: "w4_do_b", type: "Hausmannskost", desc: "Schweinegeschnetzeltes mit Gemüse, Salzkartoffeln" },
            { id: "w4_do_c", type: "C", desc: "Gemüseplatte mit Naturreis und Bärlauchsauce" }
        ],
        "Freitag": [
            { id: "w4_fr_a", type: "A", desc: "Eierfrikassee, Kartoffeln" },
            { id: "w4_fr_b", type: "Hausmannskost", desc: "Putengyros mit Paprikareis und Gemüsedip" },
            { id: "w4_fr_c", type: "C", desc: "Sylter Fischpfanne" }
        ],
        "Samstag": [
            { id: "w4_sa_a", type: "A", desc: "Bunter Gemüseeintopf mit Würstchen" },
            { id: "w4_sa_b", type: "Hausmannskost", desc: "Pichelsteiner Eintopf mit Rauchfleisch" },
            { id: "w4_sa_c", type: "C", desc: "Möhrensuppe mit vegetarischer Einlage" }
        ],
        "Sonntag": [
            { id: "w4_so_a", type: "A", desc: "Hühnerbrüstchen mit Gemüsereis" },
            { id: "w4_so_b", type: "Hausmannskost", desc: "Bratfisch, süß-saure Sauce, Kartoffeln" },
            { id: "w4_so_c", type: "C", desc: "Mexikanische Gemüsepfanne an Kartoffelpüree" }
        ],
        "Montag": [
            { id: "w4_mo_a", type: "A", desc: "Kartoffelpuffer mit Apfelmus" },
            { id: "w4_mo_b", type: "Hausmannskost", desc: "Hackbraten mit Bohnengemüse, Kartoffeln" },
            { id: "w4_mo_c", type: "C", desc: "Vollkornspaghetti mit Tomaten-Grünkernsauce" }
        ],
        "Dienstag": [
            { id: "w4_di_a", type: "A", desc: "Minibratwurst, Romanescogemüse, Kartoffelbrei" },
            { id: "w4_di_b", type: "Hausmannskost", desc: "Meerrettichfleisch, Kartoffeln" },
            { id: "w4_di_c", type: "C", desc: "Gemüse-Polenta-Auflauf" }
        ]
    },
    5: {
        "Mittwoch": [
            { id: "w5_mi_a", type: "A", desc: "Putenbraten, Gemüse, Kartoffeln" },
            { id: "w5_mi_b", type: "Hausmannskost", desc: "Gnocchi mit Lachs und Rucola" },
            { id: "w5_mi_c", type: "C", desc: "pikante Kartoffelpuffer mit Gemüse" }
        ],
        "Donnerstag": [
            { id: "w5_do_a", type: "A", desc: "Knusperfisch, Gemüse, Kartoffelbrei" },
            { id: "w5_do_b", type: "Hausmannskost", desc: "Gyros, Tzatziki, griechische Kartoffeln" },
            { id: "w5_do_c", type: "C", desc: "Vollkornnudeln mit Tomatenragout" }
        ],
        "Freitag": [
            { id: "w5_fr_a", type: "A", desc: "Grießbrei mit Früchten" },
            { id: "w5_fr_b", type: "Hausmannskost", desc: "Cevapcici auf Letschogemüse, Reis" },
            { id: "w5_fr_c", type: "C", desc: "Backkartoffeln mit Kräutercreme" }
        ],
        "Samstag": [
            { id: "w5_sa_a", type: "A", desc: "italienischer Spaghettitopf mit Rindfleisch" },
            { id: "w5_sa_b", type: "Hausmannskost", desc: "Weißkohlsuppe mit Rauchfleisch" },
            { id: "w5_sa_c", type: "C", desc: "Kartoffel-Lauchcremesuppe mit Karotteneinlage" }
        ],
        "Sonntag": [
            { id: "w5_so_a", type: "A", desc: "kleines Schnitzel, Möhrengemüse, Kartoffeln" },
            { id: "w5_so_b", type: "Hausmannskost", desc: "gegrilltes Putenschnitzel mit Zitronencremesauce" },
            { id: "w5_so_c", type: "C", desc: "Grünkernbratling mit Kohlrabigemüse, Kartoffeln" }
        ],
        "Montag": [
            { id: "w5_mo_a", type: "A", desc: "Tortellini mit Kräuter-Käsesauce" },
            { id: "w5_mo_b", type: "Hausmannskost", desc: "Schweinegoulasch mit Buttererbsen, Nudeln" },
            { id: "w5_mo_c", type: "C", desc: "Eier mit einer Schnittlauch-Kapern-Soße, Kartoffeln" }
        ],
        "Dienstag": [
            { id: "w5_di_a", type: "A", desc: "Hackbällchen mit Kohlrabigemüse, Kartoffeln" },
            { id: "w5_di_b", type: "Hausmannskost", desc: "Curry-Gemüse-Eier mit Reis" },
            { id: "w5_di_c", type: "C", desc: 'überbackener Fisch "Toscana-Art", Naturreis' }
        ]
    },
    6: {
        "Mittwoch": [
            { id: "w6_mi_a", type: "A", desc: "Rührei, Möhrengemüse, Kartoffelbrei" },
            { id: "w6_mi_b", type: "Hausmannskost", desc: "Kohlroulade, Salzkartoffeln" },
            { id: "w6_mi_c", type: "C", desc: "Vollkornspaghetti mit Pilz-Bolognese" }
        ],
        "Donnerstag": [
            { id: "w6_do_a", type: "A", desc: "Fischfilet gedünstet auf Gemüsejulienne, Reis" },
            { id: "w6_do_b", type: "Hausmannskost", desc: "Fleischkäse mit Senfhaube, Schwenkkartoffeln" },
            { id: "w6_do_c", type: "C", desc: "grüne Kartoffelpfanne mit Feta, Sesam und Oliven" }
        ],
        "Freitag": [
            { id: "w6_fr_a", type: "A", desc: "Spaghetti Carbonara" },
            { id: "w6_fr_b", type: "Hausmannskost", desc: "Marinierter Fischteller, Remoulade, Bratkartoffeln" },
            { id: "w6_fr_c", type: "C", desc: "Kartoffelgratin mit Käsekruste" }
        ],
        "Samstag": [
            { id: "w6_sa_a", type: "A", desc: "Kartoffel-Möhreneintopf mit Rindfleisch" },
            { id: "w6_sa_b", type: "Hausmannskost", desc: "Weiße Bohnensuppe mit Rauchfleisch" },
            { id: "w6_sa_c", type: "C", desc: "vegetarische Reissuppe" }
        ],
        "Sonntag": [
            { id: "w6_so_a", type: "A", desc: "Hähnchenkeule, Mischgemüse, Salzkartoffeln" },
            { id: "w6_so_b", type: "Hausmannskost", desc: "Kassler auf Sauerkraut, Klöße" },
            { id: "w6_so_c", type: "C", desc: "gefüllte Kartoffeltaschen, Broccoli, Käsesauce" }
        ],
        "Montag": [
            { id: "w6_mo_a", type: "A", desc: "Milchreis mit Apfelmus, Zimt und Zucker" },
            { id: "w6_mo_b", type: "Hausmannskost", desc: "Königsberger Klopse in Kapersauce, Kartoffeln" },
            { id: "w6_mo_c", type: "C", desc: "Kräuter-Pfannkuchen mit Gemüse-Käsefüllung" }
        ],
        "Dienstag": [
            { id: "w6_di_a", type: "A", desc: "Würstchen, Mischgemüse, Kartoffelbrei" },
            { id: "w6_di_b", type: "Hausmannskost", desc: "Toulouser Truthahnragout auf Nudeln" },
            { id: "w6_di_c", type: "C", desc: "Lachsschnitte gegrillt an Pestosauce, Reis, Fenchel" }
        ]
    }
};