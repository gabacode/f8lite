import React, { FC } from 'react';
import { Comune } from '../../types';

interface LastAlertProps {
  comune: Comune['cityName'];
}

const newLink = `https://report-dasoe.opendatasicilia.it/comune/`;
const slugify = (string: string) => string.replace(/\s+/g, '-').toLowerCase();

export const LastAlert: FC<LastAlertProps> = ({ comune }) => {
  const link = `${newLink}${slugify(comune)}`;

  return (
    <div className="bg-info">
      <p className="p-3 text-white">
        A partire dalla data 18 Luglio 2022 questa pagina non sarà più
        aggiornata.
        <br />
        Gli aggiornamenti relativi al Comune di {comune} saranno disponibili al
        seguente link:
        <br />
        <a
          href={link}
          target="_blank"
          className="text-white"
          rel="noopener noreferrer"
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          {link}
        </a>
      </p>
    </div>
  );
};
