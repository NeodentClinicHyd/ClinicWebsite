"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import type { BraceType } from "@/lib/braces-orthodontics-page";
import styles from "./BrcTypeTabs.module.css";

/* The "Types of braces" selector (Build 3).
   A tablist of four image tiles, and below it four tabpanels stacked in ONE
   grid cell: the active one is visible, the others are visibility:hidden,
   aria-hidden and inert, so the container is always as tall as the tallest
   panel and switching never shifts the page. With JavaScript unavailable the
   server markup already shows the first panel. Keyboard: Left and Right move
   and select (wrapping), Home and End jump to the first and last tile, Tab
   leaves the tablist for the active panel (the panel is focusable because it
   holds no interactive content). */

function Photo({
  type,
  sizes,
  alt,
}: {
  type: BraceType;
  sizes: string;
  alt: string;
}) {
  return (
    <div className={styles.photo}>
      {type.image.ready ? (
        <Image
          src={type.image.src}
          alt={alt}
          fill
          sizes={sizes}
          className={styles.img}
        />
      ) : (
        /* TODO(types-images): no accepted photograph for this type yet.
           Neutral placeholder, decorative. */
        <div className={styles.placeholder} data-slot={type.slot} aria-hidden="true">
          <span className={styles.mark} />
          <span className={styles.slotId}>{type.slot}</span>
        </div>
      )}
    </div>
  );
}

export function BrcTypeTabs({
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
              <Photo
                type={type}
                alt=""
                sizes="(max-width: 767px) 45vw, (max-width: 1023px) 22vw, 280px"
              />
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
                  <Photo
                    type={type}
                    alt={type.image.alt}
                    sizes="(max-width: 767px) 100vw, (max-width: 900px) 560px, 480px"
                  />
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
