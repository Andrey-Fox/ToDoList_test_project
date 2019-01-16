import React from 'react';
import './HomePage.css';

import Header from './header';

export default class HomePage extends React.Component {
render() {
	return (
	<div className="App">
		<header className="App-header">
			<Header />
			<div className = "home"> 
				<h2>Вашему вниманию представляю приложение <span> Todo list</span> написанное на <span> React</span>.</h2>  

				<p> В пириложение реализована возможность создавать списки с заметками. 
					<br />
					<br />
						Также вы можете редактировать имена списков и текст самих заметок. 
						Для этого необходимо сделать двойное нажатие на тексте заметки или списка.
						<br />
						Для приминения изменений нажните левой кнопкой мыши за приделами редактируемого объекта.
						<br />
						<br />
						В данной реализации вся информация хранится у вас в браузере в <span> localStorage</span>.

						Так же реализована возможность ограничения доступа к данным по средсвтвом <span> PrivateRoute</span> с помощью 
						<span> react-router-dom</span> .
				</p>
			</div>
		</header>
	</div>
		);
	}
}


