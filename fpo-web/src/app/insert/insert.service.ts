import { Injectable } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { InsertComponent } from "./insert.component";

@Injectable()
export class InsertService {
  private inserts: { [id: string]: InsertComponent } = {};

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let route = this.activatedRoute;
        while (route.firstChild) route = route.firstChild;
        if (route.outlet === "primary") {
          const data = route.snapshot.data;
          const updates = {};
          for (const k in this.inserts) updates[k] = (data && data[k]) || null;
          for (const k in updates) this.updateInsert(k, updates[k]);
        }
      }
    });
  }

  registerInsert(id: string, comp: InsertComponent) {
    this.inserts[id] = comp;
  }

  clearInsert(id: string) {
    this.updateInsert(id, null);
  }

  updateInsert(
    id: string,
    spec: { type: string; inputs?: any; options?: any }
  ) {
    if (this.inserts[id]) {
      // may be blank, in which case the component is hidden
      this.inserts[id].componentSpec = spec;
    } else {
      console.error("insert block not found for update: " + id);
    }
  }
}
