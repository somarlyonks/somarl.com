import * as React from 'react'
// import WeatherBoard from '../weather/board'


export default class PanelRight extends React.Component<{}, {}> {
  public render () {
    return (
      <section className="col-md panel-right font-read fluent-arcylic">
        <article className="panel-right__content">
          <h1>Lorem Ipsum</h1>
          <h4>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</h4>
          <h5>"There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain..."</h5>
          <hr />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu dictum orci. Aliquam imperdiet sem quis nisl fermentum posuere. Proin at purus et nulla eleifend rhoncus eget et orci. Vestibulum commodo orci diam, in lacinia libero placerat sit amet. Donec tincidunt vel orci non laoreet. Nullam lobortis augue urna, sit amet cursus turpis sollicitudin quis. Proin consectetur a urna at accumsan. Nam urna augue, venenatis ut purus sit amet, feugiat mattis tortor.</p>
          <p>Nam tempus purus ac eleifend dignissim. Integer feugiat euismod tempor. Nunc dignissim consectetur rhoncus. Nulla nec quam ac dolor ultricies blandit nec a orci. Mauris pharetra pulvinar lacus id vulputate. Praesent ornare risus ligula. Donec pretium ex a dictum feugiat. In eu sapien fermentum, rutrum est et, dignissim erat. Nam luctus, quam at volutpat cursus, ex nibh tincidunt dolor, at laoreet nisl elit non ligula. Aliquam eros arcu, efficitur vitae pellentesque id, cursus nec lacus.</p>
          <p>Quisque pulvinar ornare urna vitae ultricies. Maecenas convallis arcu eget ipsum congue tempor ut quis diam. Pellentesque non justo id mauris blandit pulvinar et at urna. Etiam in justo malesuada justo viverra lacinia ac et urna. Pellentesque placerat magna ut volutpat ornare. Cras rhoncus molestie nibh vitae imperdiet. Donec leo nunc, venenatis ac congue sed, molestie et quam. Aliquam rhoncus vestibulum nisl, eu molestie lorem volutpat vitae. Mauris sodales tortor semper, congue velit sit amet, fringilla metus. Aenean porta molestie pulvinar. Vivamus sed quam tortor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
          <p>Nunc vitae sem eu erat efficitur dictum eget tempus elit. Sed blandit, ante non tempor laoreet, dui nisl pharetra sapien, nec molestie erat quam in sem. Mauris risus felis, sagittis sed felis eget, mattis rutrum libero. Vivamus nec varius augue, id semper purus. Aliquam dignissim porta tempor. Proin imperdiet vel lectus ac luctus. Donec suscipit sem in dui vehicula vulputate. Maecenas vehicula, mauris in mollis efficitur, urna ex porta quam, vitae congue enim orci sed velit. Nunc non facilisis nibh, et rhoncus lacus. Quisque gravida lorem ultricies neque mattis convallis. Vivamus enim eros, varius vitae elit eu, ultrices volutpat nibh.</p>
          <p>Sed pellentesque justo tempor ex gravida sagittis. Quisque non lacus nibh. Etiam placerat sem libero. Suspendisse vel tristique nulla. Aliquam imperdiet mauris lacus, ut suscipit mi pulvinar id. Duis est diam, porta non lacus et, tempus congue tortor. Aliquam erat volutpat. Vivamus eleifend nunc a urna porta pharetra sit amet nec elit. Nunc ut sem non sapien feugiat commodo.</p>
        </article>
      </section>
    )
    // return (
    //   <section className="col-md panel-right">
    //     <WeatherBoard />
    //   </section>
    // )
  }
}
