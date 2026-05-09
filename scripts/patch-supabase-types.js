#!/usr/bin/env node
// Creates a compatibility shim so @supabase/ssr@0.6.x can import types from
// @supabase/supabase-js@2.101+ which changed its internal dist structure.
const fs = require('fs')
const path = require('path')

const pkgDir = path.join(__dirname, '..', 'node_modules', '@supabase', 'supabase-js')
const shimDir = path.join(pkgDir, 'dist', 'module', 'lib')
const shimFile = path.join(shimDir, 'types.d.ts')
const shimJS = path.join(shimDir, 'types.js')

if (!fs.existsSync(pkgDir)) {
  console.log('[patch-supabase-types] @supabase/supabase-js not found, skipping')
  process.exit(0)
}

// Only patch if the shim doesn't already exist (idempotent)
if (fs.existsSync(shimFile)) {
  console.log('[patch-supabase-types] shim already exists, skipping')
  process.exit(0)
}

fs.mkdirSync(shimDir, { recursive: true })

fs.writeFileSync(shimJS, '// shim\n')

fs.writeFileSync(shimFile, `// Compatibility shim for @supabase/ssr@0.6.x with @supabase/supabase-js@2.101+
type GenericRelationship = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne?: boolean | undefined;
  referencedRelation: string;
  referencedColumns: string[];
};
type GenericTable = {
  Row: Record<string, unknown>;
  Insert: Record<string, unknown>;
  Update: Record<string, unknown>;
  Relationships: GenericRelationship[];
};
type GenericUpdatableView = {
  Row: Record<string, unknown>;
  Insert: Record<string, unknown>;
  Update: Record<string, unknown>;
  Relationships: GenericRelationship[];
};
type GenericNonUpdatableView = {
  Row: Record<string, unknown>;
  Relationships: GenericRelationship[];
};
type GenericView = GenericUpdatableView | GenericNonUpdatableView;
type GenericFunction = {
  Args: Record<string, unknown> | never;
  Returns: unknown;
};
export type GenericSchema = {
  Tables: Record<string, GenericTable>;
  Views: Record<string, GenericView>;
  Functions: Record<string, GenericFunction>;
};
export type SupabaseClientOptions<SchemaName> = {
  db?: { schema?: SchemaName; timeout?: number };
  auth?: {
    autoRefreshToken?: boolean;
    persistSession?: boolean;
    detectSessionInUrl?: boolean;
    flowType?: 'implicit' | 'pkce';
    storage?: {
      getItem: (key: string) => string | null | Promise<string | null>;
      setItem: (key: string, value: string) => void | Promise<void>;
      removeItem: (key: string) => void | Promise<void>;
    };
    storageKey?: string;
    debug?: boolean;
  };
  realtime?: Record<string, unknown>;
  global?: { headers?: Record<string, string>; fetch?: typeof fetch };
  accessToken?: () => Promise<string>;
};
`)

// Add explicit export entry to package.json so bundler resolution finds the shim
const pkgJsonPath = path.join(pkgDir, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'))
if (!pkg.exports['./dist/module/lib/types']) {
  pkg.exports = {
    ...Object.fromEntries(
      Object.entries(pkg.exports).filter(([k]) => k !== './dist/*')
    ),
    './dist/module/lib/types': {
      types: './dist/module/lib/types.d.ts',
      default: './dist/module/lib/types.js',
    },
    './dist/*': './dist/*',
  }
  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2))
}

console.log('[patch-supabase-types] shim created successfully')
