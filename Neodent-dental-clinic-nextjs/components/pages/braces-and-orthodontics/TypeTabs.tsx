"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import type { BraceType } from "@/lib/braces-orthodontics-page";
import styles from "./TypeTabs.module.css";

/* The "Types of braces" selector (plan 4.4). Fork of BrcTypeTabs: same tab
   logic and the same semantics, new layout.
   A tablist of four compact tabs (thumbnail at most 96 px tall plus the name,
   44 px or taller), and below it four tabpanels stacked in ONE grid cell: the
   active one is visible, the others are visibility:hidden, aria-hidden and
   inert, so the container is always as tall as the tallest panel and
   switching never shifts the page. With JavaScript unavailable the server
   markup already shows the first panel, and the text of every panel is in
   the server HTML. Keyboard: Left and Right move and select (wrapping), Home
   and End jump to the first and last tab, Tab leaves the tablist for the
   active panel. */

function Photo({ type, sizes, alt }: { type: BraceType; sizes: string; alt: string }) {
  return (
    <div className={styles.photo}>
      {type.image.ready ? (
        <Image src={type.image.src} alt={alt} fill sizes={sizes} className={styles.img} />
      ) : null}
    </div>
  );
}

export function TypeTabs({
  types,
  label,
  caption,
}: {
  types: BraceType[];
  label: string;
  caption: string;
}) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (index: number, focus: boolean) => {
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = types.length - 1;
    let next: number | null = null;
    switch (event.key) {
      case "ArrowRight":
        next = active === last ? 0 : active + 1;
        break;
      case "ArrowLeft":
        next = active === 0 ? last : active - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    select(next, true);
  };

  return (
    <div className={styles.root}>
      <div role="tablist" aria-label={label} className={styles.tabs} onKeyDown={onKeyDown}>
        {types.map((type, index) => {
          const selected = index === active;
          return (
            <button
              key={type.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`brc-type-tab-${type.id}`}
              aria-selected={selected}
              aria-controls={`brc-type-panel-${type.id}`}
              tabIndex={selected ? 0 : -1}
              className={styles.tab}
              onClick={() => select(index, false)}
            >
              <Photo type={type} alt="" sizes="120px" />
              <span className={styles.tabName}>{type.name}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.panels}>
        {types.map((type, index) => {
          const selected = index === active;
          return (
            <div
              key={type.id}
              role="tabpanel"
              id={`brc-type-panel-${type.id}`}
              aria-labelledby={`brc-type-tab-${type.id}`}
              aria-hidden={selected ? undefined : true}
              inert={!selected}
              tabIndex={selected ? 0 : -1}
              className={`${styles.panel} ${selected ? styles.panelActive : ""}`}
            >
              <div className={styles.left}>
                <figure className={styles.figure}>
                  <div className={styles.big}>
                    <Photo
                      type={type}
                      alt={type.image.alt}
                      sizes="(max-width: 767px) 92vw, (max-width: 900px) 560px, 440px"
                    />
                  </div>
                  {type.image.ready ? (
                    <figcaption className={styles.caption}>{caption}</figcaption>
                  ) : null}
                </figure>
                <div className={`${styles.inset} ${styles.factsPanel}`}>
                  <p className={styles.label}>Key facts</p>
                  <dl className={styles.facts}>
                    {type.keyFacts.map((fact) => (
                      <div className={styles.fact} key={fact.label}>
                        <dt className={styles.factLabel}>{fact.label}</dt>
                        <dd className={styles.factValue}>{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className={styles.right}>
                <div className={styles.head}>
                  <h3 className={styles.name}>{type.name}</h3>
                  <p className={styles.summary}>{type.summary}</p>
                </div>
                <div className={`${styles.block} ${styles.whatIs}`}>
                  <p className={styles.label}>What it is</p>
                  <p className={styles.text}>{type.whatItIs}</p>
                </div>
                <div className={`${styles.block} ${styles.different}`}>
                  <p className={styles.label}>What makes it different</p>
                  <p className={styles.text}>{type.different}</p>
                </div>
                <div className={`${styles.inset} ${styles.knowPanel}`}>
                  <p className={styles.label}>Worth knowing</p>
                  <ul className={styles.know}>
                    {type.worthKnowing.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
