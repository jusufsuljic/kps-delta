'use client'
import React from 'react'
import styled from 'styled-components'
import idpaLogo from "@/../public/IDPA-logo.png"
import Image from "next/image";
import idpaSlika from "@/../public/ipdaImgOpt.jpg"

const IDPAPage = () => {
    return (
        <IDPAPageContainer>
            <IDPALogoWrapper>
                <Image src={idpaLogo} alt="IDPA" width={192} height={192} />
            </IDPALogoWrapper>
            <br />
            <span>IDPA (International Defensive Pistol Association) je sportska streljačka disciplina koja simulira stvarne scenarije samoodbrane koristeći pištolj ili pušku.
                Takmičenja su osmišljena da testiraju sposobnosti učesnika u realnim i dinamičnim situacijama – kao što su kretanje, zaklon, upotreba pištolja iz futrole(skriveno nošenje).
                Fokus je na preciznosti, brzini i pravilnoj upotrebi oružja, uz ograničenja u opremi kako bi se zadržala realnost i dostupnost za svakog vlasnika vatrenog oružja.
            </span>
            <span>
                Takmičenja su osmišljena da testiraju sposobnosti učesnika u realnim i dinamičnim situacijama – kao što su kretanje, zaklon, upotreba pištolja iz futrole(skriveno nošenje).
            </span>
            <span>
                Fokus je na preciznosti, brzini i pravilnoj upotrebi oružja, uz ograničenja u opremi kako bi se zadržala realnost i dostupnost za svakog vlasnika vatrenog oružja.
            </span>
            <img src={idpaSlika.src}></img>
            <br />
            <span>Da bi postao član IDPA zajednice, potrebno je proći nekoliko osnovnih koraka:</span>

            <StepsList>
                <li>
                    Registracija na zvaničnoj IDPA stranici – Posjeti{" "}
                    <a href="https://www.idpa.com" target="_blank" rel="noopener noreferrer">
                        www.idpa.com
                    </a>{" "}
                    i kreiraj svoj profil. Nakon registracije, možeš platiti godišnju članarinu i time postaješ zvaničan član IDPA organizacije.
                </li>
                <li>
                    Pridruživanje lokalnom klubu –{" "}
                    <a href="https://www.idpa.com/clubs/kps-delta/" target="_blank" rel="noopener noreferrer">
                        https://www.idpa.com/clubs/kps-delta/
                    </a>
                </li>
                <li>
                    Učešće na treningu ili meču – Prije takmičenja, novi članovi obično prolaze sigurnosnu provjeru i uvodni trening kako bi se upoznali s pravilima i procedurama.
                </li>
                <li>
                    Nabavka odgovarajuće opreme – Potreban ti je pouzdan pištolj, futrola, rezervni okviri, zaštita za oči i uši, kao i minimalno 3 rezervna okvira. Oprema mora biti u skladu s IDPA pravilima.
                </li>
                <li>
                    Redovno učestvovanje u treninzima i mečevima – Aktivnim učešćem u klupskim i zvaničnim IDPA takmičenjima stičeš iskustvo i napreduješ u rangiranju.
                </li>
            </StepsList>
        </IDPAPageContainer>
    )
}

export default IDPAPage

const StepsList = styled.ol`
  padding-left: 20px;
  a{
    text-decoration: underline;
  }
`;

const IDPAPageContainer = styled.div`
    display: flex;
    flex-direction: column; 
    padding: 1rem 20rem;
    font-size: 1rem;
    @media screen and (max-width: 767px) {
        padding: 2rem;
    }
    span{
        display: block;
        margin-bottom: 2rem;
        text-align: justify;
    }
`

const IDPALogoWrapper = styled.div`
    display: flex;
    align-self: center;
    img {
        height: 5rem;
        width: 16rem;
    }
`;