import React from "react";
import { LOSources } from './list-of-sources.js';


export function ArticleDiv(props) {

    let src = "";
    LOSources.map((source) => {
        if(source.name === props.sourceName) {
            src = source.logo;
        }
    });

    return (
        <a href={props.url} target="_blank" class={props.sourceName} id={props.title}>
            <div class="article-div">
                <h2>{props.title}</h2>
                <div className="crop">
                    <img src={src}/>
                </div>
                <p class="description">{props.description}</p>
            </div>
        </a>
    )
}
