Locales["pl"] = {
    UI = {
        modal = {
            save = {
                title = "Zapisz wygląd",
                description = "Nie będzie odwrotu"
            },
            exit = {
                title = "Wyjdź bez zapisu",
                description = "Żadne zmiany nie zostaną zapisane"
            },
            accept = "Tak",
            decline = "Nie"
        },
        ped = {
            title = "Postać",
            model = "Model"
        },
        headBlend = {
            title = "Dziedziczenie",
            shape = {
                title = "Twarz",
                firstOption = "Ojciec",
                secondOption = "Matka",
                mix = "Mieszanie"
            },
            skin = {
                title = "Skóra",
                firstOption = "Ojciec",
                secondOption = "Matka",
                mix = "Mieszanie"
            },
            race = {
                title = "Rasa",
                shape = "Kształt",
                skin = "Skóra",
                mix = "Mieszanie"
            }
        },
        faceFeatures = {
            title = "Rysy twarzy",
            nose = {
                title = "Nos",
                width = "Szerokość",
                height = "Wysokość",
                size = "Rozmiar",
                boneHeight = "Wysokość kości",
                boneTwist = "Skręcenie kości",
                peakHeight = "Wysokość szczytu"
            },
            eyebrows = {
                title = "Brwi",
                height = "Wysokość",
                depth = "Głębokość"
            },
            cheeks = {
                title = "Policzki",
                boneHeight = "Wysokość kości",
                boneWidth = "Szerokość kości",
                width = "Szerokość"
            },
            eyesAndMouth = {
                title = "Oczy i usta",
                eyesOpening = "Otwarcie oczu",
                lipsThickness = "Grubość ust"
            },
            jaw = {
                title = "Szczęka",
                width = "Szerokość",
                size = "Rozmiar"
            },
            chin = {
                title = "Podbródek",
                lowering = "Obniżenie",
                length = "Długość",
                size = "Rozmiar",
                hole = "Rozmiar dołka"
            },
            neck = {
                title = "Szyja",
                thickness = "Grubość"
            }
        },
        headOverlays = {
            title = "Wygląd",
            hair = {
                title = "Włosy",
                style = "Fryzura",
                color = "Kolor",
                highlight = "Pasemka",
                texture = "Tekstura",
                fade = "Wycieniowanie"
            },
            opacity = "Przezroczystość",
            style = "Styl",
            color = "Kolor",
            secondColor = "Drugi kolor",
            blemishes = "Skazy",
            beard = "Broda",
            eyebrows = "Brwi",
            ageing = "Starzenie",
            makeUp = "Makijaż",
            blush = "Róż",
            complexion = "Cera",
            sunDamage = "Opalenizna",
            lipstick = "Szminka",
            moleAndFreckles = "Pieprzyki i piegi",
            chestHair = "Włosy na klatce",
            bodyBlemishes = "Skazy ciała",
            eyeColor = "Kolor oczu"
        },
        components = {
            title = "Ubrania",
            drawable = "Model",
            texture = "Tekstura",
            mask = "Maska",
            upperBody = "Dłonie",
            lowerBody = "Nogi",
            bags = "Plecaki i spadochron",
            shoes = "Buty",
            scarfAndChains = "Szalik i łańcuszki",
            shirt = "Koszula",
            bodyArmor = "Kamizelka",
            decals = "Naklejki",
            jackets = "Kurtki",
            head = "Głowa"
        },
        props = {
            title = "Dodatki",
            drawable = "Model",
            texture = "Tekstura",
            hats = "Czapki i hełmy",
            glasses = "Okulary",
            ear = "Uszy",
            watches = "Zegarki",
            bracelets = "Bransoletki"
        },
        tattoos = {
            title = "Tatuaże",
            items = {
                ZONE_TORSO = "Tułów",
                ZONE_HEAD = "Głowa",
                ZONE_LEFT_ARM = "Lewa ręka",
                ZONE_RIGHT_ARM = "Prawa ręka",
                ZONE_LEFT_LEG = "Lewa noga",
                ZONE_RIGHT_LEG = "Prawa noga"
            },
            apply = "Zastosuj",
            delete = "Usuń",
            deleteAll = "Usuń wszystkie tatuaże",
            opacity = "Przezroczystość"
        }
    },
    outfitManagement = {
        title = "Zarządzanie strojami",
        jobText = "Zarządzaj strojami dla pracy",
        gangText = "Zarządzaj strojami dla gangu"
    },
    cancelled = {
        title = "Anulowano edycję",
        description = "Wygląd nie został zapisany"
    },
    outfits = {
        import = {
            title = "Wpisz kod stroju",
            menuTitle = "Importuj strój",
            description = "Zaimportuj strój z kodu współdzielonego",
            name = {
                label = "Nazwa stroju",
                placeholder = "Fajny strój",
                default = "Zaimportowany strój"
            },
            code = {
                label = "Kod stroju"
            },
            success = {
                title = "Strój zaimportowany",
                description = "Możesz go teraz wybrać z menu strojów"
            },
            failure = {
                title = "Błąd importu",
                description = "Nieprawidłowy kod stroju"
            }
        },
        generate = {
            title = "Wygeneruj kod stroju",
            description = "Wygeneruj kod stroju do udostępnienia",
            failure = {
                title = "Coś poszło nie tak",
                description = "Nie udało się wygenerować kodu stroju"
            },
            success = {
                title = "Kod stroju wygenerowany",
                description = "Oto twój kod stroju"
            }
        },
        save = {
            menuTitle = "Zapisz obecny strój",
            menuDescription = "Zapisz obecny strój jako strój %s",
            description = "Zapisz obecny strój",
            title = "Nadaj nazwę strojowi",
            managementTitle = "Szczegóły zarządzania strojem",
            name = {
                label = "Nazwa stroju",
                placeholder = "Bardzo fajny strój"
            },
            gender = {
                label = "Płeć",
                male = "Mężczyzna",
                female = "Kobieta"
            },
            rank = {
                label = "Minimalna ranga"
            },
            failure = {
                title = "Zapis nieudany",
                description = "Strój o tej nazwie już istnieje"
            },
            success = {
                title = "Sukces",
                description = "Strój %s został zapisany"
            }
        },
        update = {
            title = "Aktualizuj strój",
            description = "Zapisz obecne ubrania do istniejącego stroju",
            failure = {
                title = "Aktualizacja nieudana",
                description = "Taki strój nie istnieje"
            },
            success = {
                title = "Sukces",
                description = "Strój %s został zaktualizowany"
            }
        },
        change = {
            title = "Zmień strój",
            description = "Wybierz dowolny z zapisanych strojów %s",
            pDescription = "Wybierz dowolny z zapisanych strojów",
            failure = {
                title = "Coś poszło nie tak",
                description = "Wybrany strój nie posiada bazowego wyglądu",
            }
        },
        delete = {
            title = "Usuń strój",
            description = "Usuń zapisany strój %s",
            mDescription = "Usuń dowolny z zapisanych strojów",
            item = {
                title = 'Usuń "%s"',
                description = "Model: %s%s"
            },
            success = {
                title = "Sukces",
                description = "Strój usunięty"
            }
        },
        manage = {
            title = "👔 | Zarządzaj strojami %s"
        }
    },
    jobOutfits = {
        title = "Stroje służbowe",
        description = "Wybierz dowolny ze strojów służbowych"
    },
    menu = {
        returnTitle = "Powrót",
        title = "Garderoba",
        outfitsTitle = "Stroje gracza",
        clothingShopTitle = "Sklep odzieżowy",
        barberShopTitle = "Fryzjer",
        tattooShopTitle = "Tatuażysta",
        surgeonShopTitle = "Chirurg plastyczny"
    },
    clothing = {
        title = "Kup ubranie - $%d",
        titleNoPrice = "Zmień ubranie",
        options = {
            title = "👔 | Opcje sklepu odzieżowego",
            description = "Wybierz z szerokiej gamy ubrań"
        },
        outfits = {
            title = "👔 | Opcje strojów",
            civilian = {
                title = "Strój cywilny",
                description = "Załóż swoje ubrania"
            }
        }
    },
    commands = {
        reloadskin = {
            title = "Przeładowuje twoją postać",
            failure = {
                title = "Błąd",
                description = "Nie możesz teraz użyć reloadskin"
            }
        },
        clearstuckprops = {
            title = "Usuwa wszystkie przyczepione propsy",
            failure = {
                title = "Błąd",
                description = "Nie możesz teraz użyć clearstuckprops"
            }
        },
        pedmenu = {
            title = "Otwórz / Daj menu ubrań",
            failure = {
                title = "Błąd",
                description = "Gracz niedostępny"
            }
        },
        joboutfits = {
            title = "Otwiera menu strojów służbowych"
        },
        gangoutfits = {
            title = "Otwiera menu strojów gangu"
        },
        bossmanagedoutfits = {
            title = "Otwiera menu zarządzania strojami szefa"
        }
    },
    textUI = {
        clothing = "Sklep odzieżowy - Cena: $%d",
        barber = "Fryzjer - Cena: $%d",
        tattoo = "Tatuażysta - Cena: $%d",
        surgeon = "Chirurg plastyczny - Cena: $%d",
        clothingRoom = "Garderoba",
        playerOutfitRoom = "Stroje"
    },
    migrate = {
        success = {
            title = "Sukces",
            description = "Migracja zakończona. Zmigrowano %s skinów",
            descriptionSingle = "Skin zmigrowany"
        },
        skip = {
            title = "Informacja",
            description = "Skin pominięty"
        },
        typeError = {
            title = "Błąd",
            description = "Nieprawidłowy typ"
        }
    },
    purchase = {
        tattoo = {
            success = {
                title = "Sukces",
                description = "Zakupiono tatuaż %s za %s$"
            },
            failure = {
                title = "Nie udało się zastosować tatuażu",
                description = "Nie masz wystarczająco pieniędzy!"
            }
        },
        store = {
            success = {
                title = "Sukces",
                description = "Przekazano $%s dla %s!"
            },
            failure = {
                title = "Exploit!",
                description = "Nie miałeś wystarczająco pieniędzy! Próbowałeś oszukać system!"
            }
        }
    }
}
